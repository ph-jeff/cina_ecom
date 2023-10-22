import React, { useEffect, useRef, useState } from 'react'
import ConfirmDialog from '../../../components/ConfirmDialog'
import api from '../../../services/apiRequest';

const Table = ({orders, setOrders, onConfirm}) => {
    const [open, setOpen] = useState(false)
    const [id, setId] = useState("");

    function onConfirm(){
        api.put('/api/admin/order/' + id)
        .then(response => {
            console.log(response)
            setOrders(prev => prev.filter(order => order._id !== id))
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {

    }, [id])

    return (
        <>
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Order ID</th>
                        <th className="px-4 py-2 text-left">Items</th>
                        <th className="px-4 py-2 text-left">Quantity</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Mode</th>
                        <th className="px-4 py-2 text-left">Destination</th>
                        <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td className="px-4 py-2">{order._id}</td>
                            <td className="px-4 py-2">{order.items.map(item => (
                                <div key={item._id}>
                                    <p>{item.product_id.name}</p>
                                </div>
                            ))}</td>
                            <td className="px-4 py-2">
                                {order.items.map(item => (
                                    <div key={item._id}>
                                        <p>{item.quantity}</p>
                                    </div>
                                ))}
                            </td>
                            <td className="px-4 py-2">{order.sub_total}</td>
                            <td className="px-4 py-2">{order.payment}</td>
                            <td className="px-4 py-2">{order.destination}</td>
                            <td className="px-4 py-2">
                                <button onClick={() => {
                                    setId(order._id)
                                    setOpen(!open)
                                }}>accept</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ConfirmDialog message={"Are you sure you want to proceed"} open={open} setOpen={setOpen} onConfirm={onConfirm} />
        </>
    )
}

export default Table