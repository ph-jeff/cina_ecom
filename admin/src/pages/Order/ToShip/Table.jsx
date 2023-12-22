import React, { useEffect, useState } from 'react'
import ConfirmDialog from '../../../components/ConfirmDialog'
import api from '../../../services/apiRequest';
import Pagination from '../../../components/Pagination';

const Table = ({orders, setOrders, onConfirm, totalPages, currentPage, setCurrentPage}) => {
    const [open, setOpen] = useState(false)
    const [id, setId] = useState("");

    function onConfirm(){
        api.put('/api/admin/order/to-ship/' + id)
        .then(response => {
            console.log(response)
            setOrders(prev => prev.filter(order => order._id !== id))
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
        <>
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead className="w-full text-sm text-left text-gray-500">
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Items</th>
                        <th className="px-4 py-2 text-left">Size</th>
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
                            <td className="px-4 py-2">{order.items.map(item => (
                                <div key={item._id}>
                                    <p>{item.product_id.name}</p>
                                </div>
                            ))}</td>
                            <td className="px-4 py-2">
                                {order.items.map(item => (
                                    <div key={item._id}>
                                        <p>{item.size.unit_size} - {item.size.selected_size}</p>
                                    </div>
                                ))}
                            </td>
                            <td className="px-4 py-2">{order.items.map(item => (
                                <div key={item._id}>
                                    <p>{item.quantity}</p>
                                </div>
                            ))}</td>
                            <td className="px-4 py-2">{order.sub_total}</td>
                            <td className="px-4 py-2">{order.payment}</td>
                            <td className="px-4 py-2">{order.destination}</td>
                            <td className="px-4 py-2">
                                <button className='border shadow p-1 rounded' onClick={() => {
                                    setId(order._id)
                                    setOpen(!open)
                                }}>accept</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {orders.length != 0 && <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
            <ConfirmDialog message={"Are you sure you want to proceed"} open={open} setOpen={setOpen} onConfirm={onConfirm} />
        </>
    )
}

export default Table