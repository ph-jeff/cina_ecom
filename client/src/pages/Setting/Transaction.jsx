import React, { useEffect, useState } from 'react';
import ActionButton from '../../components/ActionButton';
import api from '../../services/apiRequest';

const Transaction = () => {
    const defaultStar = Array.from({ length: 5 }, () => Array(5));
    const [rating, setRating] = useState(0)
    const [status, setStatus] = useState("pending")
    const [orders, setOrders] = useState([])
    useEffect(() => {
        function fetchOrders(){
            api.get('/api/user/transaction?status=' + status)
            .then(response => {
                console.log(response)
                setOrders(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
        fetchOrders()
    }, [status])
    return (
        <>
            <div className="container mx-auto p-4 min-h-screen">
                <h1 className='font-medium text-2xl mb-4'>Transaction</h1>
                <div className='flex justify-around my-5'>
                    <button onClick={() => setStatus("pending")} className={`${status === "pending" ? 'bg-gray-500' : 'bg-slate-200'} rounded h-[100px] w-[200px]`}>Pending</button>
                    <button onClick={() => setStatus("prepairing")} className={`${status === "prepairing" ? 'bg-gray-500' : 'bg-slate-200'} rounded h-[100px] w-[200px]`}>Prepairing</button>
                    <button onClick={() => setStatus("to-ship")} className={`${status === "to-ship" ? 'bg-gray-500' : 'bg-slate-200'} rounded h-[100px] w-[200px]`}>To Ship</button>
                    <button onClick={() => setStatus("delivered")} className={`${status === "delivered" ? 'bg-gray-500' : 'bg-slate-200'} rounded h-[100px] w-[200px]`}>Delivered</button>
                </div>
                <div className="w-full mb-4">
                    <div className="bg-white shadow-md p-4 rounded-md">
                        <div className="mb-4">
                            <table className="w-full table-auto border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 text-left">Order ID</th>
                                        <th className="px-4 py-2 text-left">Items</th>
                                        <th className="px-4 py-2 text-left">Address</th>
                                        <th className="px-4 py-2 text-left">Date Ordered</th>
                                        <th className="px-4 py-2 text-left">{status !== "delivered" ? "Action" : "Rate"}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td className="px-4 py-2">{order._id}</td>
                                            <td className="px-4 py-2">
                                                {order.items.map((item) => (
                                                    <div key={item._id}>
                                                        {item.product_id.name}
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="px-4 py-2">{order.destination}</td>
                                            <td className="px-4 py-2">{order.createdAt}</td>
                                            {status !== 'delivered' ?
                                                <td className="px-4 py-2">
                                                    cancel
                                                </td>
                                            : <td className="px-4 py-2">
                                                <div className='flex'>
                                                    {defaultStar.map((star, index) => (
                                                        <p onClick={() => {
                                                            console.log(index)
                                                        }} className='bg-gray-900 m-1' key={index}>a</p>
                                                    ))}
                                                </div>
                                            </td>}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Transaction