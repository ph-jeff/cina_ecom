import React, { useEffect, useState } from 'react'
import ConfirmDialog from '../../../components/ConfirmDialog'
import api from '../../../services/apiRequest';
import Pagination from '../../../components/Pagination';
import WarningDialog from '../../../components/WarningDialog';
import { toast } from 'react-hot-toast'

const Table = ({orders, setOrders, fetchOrder, totalPages, currentPage, setCurrentPage}) => {
    const [open, setOpen] = useState(false)
    const [id, setId] = useState("");

    function onConfirm(){
        api.put('/api/admin/order/prepairing/' + id)
        .then(response => {
            console.log(response)
            fetchOrder();
            // setOrders(prev => prev.filter(order => order._id !== id))
        })
        .catch(error => {
            fetchOrder();
            console.log(error)
            toast.error(error.response.data.error)
        })
    }

    return (
        <>
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead className="w-full text-sm text-left text-gray-500">
                    <tr className="bg-gray-100">
                        <th className='py-2 px-4 text-left border'>Items</th>
                        <th className='py-2 px-4 text-left border'>Size</th>
                        <th className='py-2 px-4 text-left border'>Quantity</th>
                        <th className='py-2 px-4 text-left border'>Price</th>
                        <th className='py-2 px-4 text-left border'>Mode</th>
                        <th className='py-2 px-4 text-left border'>Destination</th>
                        <th className='py-2 px-4 text-left border'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id}>
                            <td className='py-2 px-4 text-left border'>{order.items.map(item => (
                                <div key={item._id}>
                                    <p>{item.product_id.name}</p>
                                </div>
                            ))}</td>
                            <td className='py-2 px-4 text-left border'>
                                {order.items.map(item => (
                                    <div key={item._id}>
                                        <p>{item.size.unit_size} - {item.size.selected_size}</p>
                                    </div>
                                ))}
                            </td>
                            <td className='py-2 px-4 text-left border'>{order.items.map(item => (
                                <div key={item._id}>
                                    <p>{item.quantity}</p>
                                </div>
                            ))}</td>
                            <td className='py-2 px-4 text-left border'>{order.sub_total}</td>
                            <td className='py-2 px-4 text-left border'>{order.payment}</td>
                            <td className='py-2 px-4 text-left border'>{order.destination}</td>
                            <td className='py-2 px-4 text-left border'>
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