import React, { useEffect, useState } from 'react'
import api from '../../../services/apiRequest'

const Table = () => {
    const [orders, setOrders] = useState([])

    function handleOpen(pending){

    }
    useEffect(() => {
        function fetchOrder(){
            api.get('/api/admin/order/completed')
            .then(response => {
                console.log(response)
                setOrders(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
        fetchOrder()
    }, [])
    return (
        <>
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Order ID</th>
                        <th className="px-4 py-2 text-left">Items</th>
                        <th className="px-4 py-2 text-left">Mode</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td className="px-4 py-2">{order._id}</td>
                            <td className="px-4 py-2">{order.items.map(item => (
                                <div key={item._id}>
                                    <p>{item.name}</p>
                                </div>
                            ))}</td>
                            <td className="px-4 py-2">{order.payment}</td>
                            <td className="px-4 py-2">{order.status}</td>
                            <td className="px-4 py-2">
                                <button>accept</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Table