import React, { useEffect, useState } from 'react'

const Table = ({orders, setOrders}) => {
    return (
        <>
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead className="w-full text-sm text-left text-gray-500">
                    <tr className="bg-gray-100">
                        <th className='py-2 px-4 text-left border'>Order ID</th>
                        <th className='py-2 px-4 text-left border'>Items</th>
                        <th className='py-2 px-4 text-left border'>Quantity</th>
                        <th className='py-2 px-4 text-left border'>Mode</th>
                        <th className='py-2 px-4 text-left border'>Destination</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td className='py-2 px-4 text-left border'>{order._id}</td>
                            <td className='py-2 px-4 text-left border'>{order.items.map(item => (
                                <div key={item._id}>
                                    <p>{item.product_id.name}</p>
                                </div>
                            ))}</td>
                            <td className='py-2 px-4 text-left border'>{order.items.map(item => (
                                <div key={item._id}>
                                    <p>{item.quantity}</p>
                                </div>
                            ))}</td>
                            <td className='py-2 px-4 text-left border'>{order.payment}</td>
                            <td className='py-2 px-4 text-left border'>{order.destination}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Table