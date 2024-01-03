import React, { useEffect, useState } from 'react';
import ActionButton from '../../components/ActionButton';
import api from '../../services/apiRequest';
import Track from './components/Track';
import WarningDialog from '../../components/WarningDialog';
import Loading from '../../components/Loading';

// icons
import Pending from '@mui/icons-material/PendingActions';
import ToPay from '@mui/icons-material/Payment';
import ToDeliver from '@mui/icons-material/CallMissedOutgoing';
import Delivered from '@mui/icons-material/LocalShipping';

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
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5'>
                    <button onClick={() => setStatus("pending")} className={`status-button ${status === "pending" ? 'bg-orange-300' : 'bg-slate-200'} rounded shadow h-[100px] w-[100vw md:w-[200px] `}>
                        <Pending className='text-orange-800' />
                        <p className={`${status === "pending" ? 'text-orange-800' : ''}`}>Order</p>
                    </button>
                    <button onClick={() => setStatus("prepairing")} className={`status-button ${status === "prepairing" ? 'bg-blue-300' : 'bg-slate-200'} rounded shadow h-[100px] w-[100vw md:w-[200px] `}>
                        <ToPay className='text-blue-800' />
                        <p className={`${status === "prepairing" ? 'text-blue-800' : ''}`}>To Pay</p>
                    </button>
                    <button onClick={() => setStatus("to-ship")} className={`status-button ${status === "to-ship" ? 'bg-green-300' : 'bg-slate-200'} rounded shadow h-[100px] w-[100vw md:w-[200px] `}>
                        <ToDeliver className='text-green-800' />
                        <p className={`${status === "to-ship" ? 'text-green-800' : ''}`}>To Ship</p>
                    </button>
                    <button onClick={() => setStatus("delivered")} className={`status-button ${status === "delivered" ? 'bg-red-300' : 'bg-slate-200'} rounded shadow h-[100px] w-[100vw md:w-[200px] `}>
                        <Delivered className='text-red-800' />
                        <p className={`${status === "delivered" ? 'text-red-800' : ''}`}>Delivered</p>
                    </button>
                </div>

                <div className="w-full mb-4">
                    <div className="bg-white shadow-md p-4 rounded-md overflow-x-auto">
                        <table className="w-full table-auto border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Items</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Address</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Date Ordered</th>
                                    {status === 'pending' && (
                                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Action</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id} className="transition-all hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            {order.items.map((item, index) => (
                                                <div key={item._id} className={`${index > 0 ? 'mt-1' : ''}`}>
                                                    {item.product_id.name}
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4">{order.destination}</td>
                                        <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        {status === 'pending' && (
                                            <td className="px-6 py-4">
                                                <button className='text-red-600 hover:underline focus:outline-none'
                                                    onClick={() => {
                                                        setId(order._id)
                                                        setWarning(!warning)
                                                    }}
                                                >Cancel</button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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