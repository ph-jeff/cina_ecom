import React, { useEffect, useState } from 'react'

const Table = ({orders, setOrders}) => {
    return (
        <>
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Order ID</th>
                        <th className="px-4 py-2 text-left">Items</th>
                        <th className="px-4 py-2 text-left">Quantity</th>
                        <th className="px-4 py-2 text-left">Mode</th>
                        <th className="px-4 py-2 text-left">Destination</th>
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
                            <td className="px-4 py-2">{order.items.map(item => (
                                <div key={item._id}>
                                    <p>{item.quantity}</p>
                                </div>
                            ))}</td>
                            <td className="px-4 py-2">{order.payment}</td>
                            <td className="px-4 py-2">{order.destination}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Table