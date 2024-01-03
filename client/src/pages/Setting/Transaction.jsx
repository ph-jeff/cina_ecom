import React, { useEffect, useState } from 'react';
import ActionButton from '../../components/ActionButton';
import api from '../../services/apiRequest';
import Track from './components/Track';
import WarningDialog from '../../components/WarningDialog';
import Loading from '../../components/Loading';

const Transaction = () => {
    const defaultStar = Array.from({ length: 5 }, () => Array(5));
    const [rating, setRating] = useState(0)
    const [status, setStatus] = useState("pending")
    const [orders, setOrders] = useState([])
    const [transaction, setTransaction] = useState({})
    const [open, setOpen] = useState(false);
    const [warning, setWarning] = useState(false);
    const [id, setId] = useState("");

    const [isLoading, setLoading] = useState(false);

    // function fetchOrders(){
    //     setLoading(true);
    //     api.get('/api/user/transaction')
    //     .then(response => {
    //         console.log(response)
    //         setOrders(response.data)
    //         setLoading(false);
    //     })
    //     .catch(error => {
    //         console.log(error)
    //         setLoading(false);
    //     })
    // }

    function fetchOrders(){
        setLoading(true);
        api.get(`/api/user/transaction?status=${status}`)
        .then(response => {
            console.log(response)
            setOrders(response.data)
            setLoading(false);
        })
        .catch(error => {
            console.log(error)
            setLoading(false);
        })
    }

    useEffect(() => {
        setOrders([])
        fetchOrders()
    }, [status])

    function onCancel(){
        api.put('/api/user/transaction/cancel-order/' + id)
        .then(response => {
            fetchOrders();
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <>
        {isLoading && <Loading />}
            <div className="container mx-auto p-4 min-h-screen">
                <h1 className='font-medium text-2xl mb-4'>Transaction</h1>
                <div className='flex justify-around my-5'>
                    <button onClick={() => setStatus("pending")} className={`${status === "pending" ? 'bg-gray-400' : 'bg-slate-200'} rounded h-[100px] w-[200px] shadow`}>Pending</button>
                    <button onClick={() => setStatus("prepairing")} className={`${status === "prepairing" ? 'bg-gray-500' : 'bg-slate-200'} rounded h-[100px] w-[200px] shadow`}>Prepairing</button>
                    <button onClick={() => setStatus("to-ship")} className={`${status === "to-ship" ? 'bg-gray-500' : 'bg-slate-200'} rounded h-[100px] w-[200px] shadow`}>To Ship</button>
                    <button onClick={() => setStatus("delivered")} className={`${status === "delivered" ? 'bg-gray-400' : 'bg-slate-200'} rounded h-[100px] w-[200px] shadow`}>Delivered</button>
                </div>
                <div className="w-full mb-4">
                    <div className="bg-white shadow-md p-4 rounded-md">
                        <div className="mb-4">
                            <table className="w-full table-auto border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 text-left">Items</th>
                                        <th className="px-4 py-2 text-left">Address</th>
                                        <th className="px-4 py-2 text-left">Date Ordered</th>
                                        {status === 'pending' && (
                                            <th className="px-4 py-2 text-left">Action</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td className="px-4 py-2">
                                                {order.items.map((item) => (
                                                    <div key={item._id}>
                                                        {item.product_id.name}
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="px-4 py-2">{order.destination}</td>
                                            <td className="px-4 py-2">{order.createdAt}</td>
                                            {status === 'pending'
                                                &&
                                                <td className="px-4 py-2">
                                                     <button className='border shadow p-1 rounded text-red-600'
                                                        onClick={() => {
                                                            setId(order._id)
                                                            setWarning(!warning)
                                                        }}
                                                    >cancel</button>
                                                </td>
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <WarningDialog message={"Are you sure you want to cancel this order?"} warning={warning} setWarning={setWarning} onCancel={onCancel} />
        </>

        // <>
        //     {isLoading && <Loading />}
        //     <div className="container mx-auto p-4 min-h-screen">
        //         <h1 className='font-medium text-2xl mb-4'>Transaction</h1>
        //         <div className="w-full mb-4">
        //             <div className="bg-white shadow-md p-4 rounded-md">
        //                 <div className="mb-4">
        //                     <table className="w-full table-auto border-collapse border border-gray-300">
        //                         <thead>
        //                             <tr className="bg-gray-100">
        //                                 <th className="px-4 py-2 text-left">Items</th>
        //                                 <th className="px-4 py-2 text-left">Address</th>
        //                                 <th className="px-4 py-2 text-left">Date Ordered</th>
        //                                 {status === 'pending' && (
        //                                     <th className="px-4 py-2 text-left">Action</th>
        //                                 )}
        //                             </tr>
        //                         </thead>
        //                         <tbody>
        //                             {orders.map((order) => (
        //                                 <tr key={order._id}>
        //                                     <td className="px-4 py-2">
        //                                         {order.items.map((item) => (
        //                                             <div key={item._id}>
        //                                                 {item.product_id.name}
        //                                             </div>
        //                                         ))}
        //                                     </td>
        //                                     <td className="px-4 py-2">{order.destination}</td>
        //                                     <td className="px-4 py-2">{order.createdAt}</td>
        //                                     {status === 'pending'
        //                                         &&
        //                                         <td className="px-4 py-2">
        //                                              <div className='flex'>
        //                                              <button onClick={() => {
        //                                                 setTransaction(order)
        //                                                 setOpen(!open)
        //                                             }} className='border shadow p-1 rounded underline'>view</button>
        //                                             {order.status === 'pending' && (
        //                                                 <button className='border shadow p-1 rounded text-red-600'
        //                                                 onClick={() => {
        //                                                     setId(order._id)
        //                                                     setWarning(!warning)
        //                                                 }}
        //                                                 >cancel</button>
        //                                             )}
        //                                              </div>
        //                                         </td>
        //                                     }
        //                                 </tr>
        //                             ))}
        //                         </tbody>
        //                     </table>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <Track open={open} setOpen={() => setOpen(!open) } transaction={transaction} />
        //     <WarningDialog message={"Are you sure you want to cancel this order?"} warning={warning} setWarning={setWarning} onCancel={onCancel} />
        // </>
    )
}

export default Transaction