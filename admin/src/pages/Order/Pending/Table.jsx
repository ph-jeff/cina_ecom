import React, { useEffect, useRef, useState } from 'react'
import ConfirmDialog from '../../../components/ConfirmDialog'
import api from '../../../services/apiRequest';
import Pagination from '../../../components/Pagination';
import WarningDialog from '../../../components/WarningDialog';
import { toast } from 'react-hot-toast'

const Table = ({orders, setOrders, fetchOrder, totalPages, currentPage, setCurrentPage}) => {
    const [open, setOpen] = useState(false)
    const [warning, setWarning] = useState(false);
    const [id, setId] = useState("");

    function onConfirm(){
        api.put('/api/admin/order/' + id)
        .then(response => {
            fetchOrder();
            console.log(response)
            // setOrders(prev => prev.filter(order => order._id !== id))
        })
        .catch(error => {
            console.log(error)
            toast.error(error.response.data.error)
        })
    }

    function onCancel(){
        console.log(id)
        api.put('/api/admin/order/cancelled/' + id)
        .then(response => {
            fetchOrder();
            console.log(response)
            // setOrders(prev => prev.filter(order => order._id !== id))
        })
        .catch(error => {
            console.log(error)
        })
    }

    // useEffect(() => {

    // }, [id])

    return (
        <>
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead className="w-full text-sm text-left text-gray-500">
                    <tr className="bg-gray-100">
                        <th scope="col" className='py-2 px-4 text-left border'>Items</th>
                        <th scope="col" className='py-2 px-4 text-left border'>Size</th>
                        <th scope="col" className='py-2 px-4 text-left border'>Quantity</th>
                        <th scope="col" className='py-2 px-4 text-left border'>Price</th>
                        <th scope="col" className='py-2 px-4 text-left border'>Mode</th>    
                        <th scope="col" className='py-2 px-4 text-left border'>Destination</th>
                        <th scope="col" className='py-2 px-4 text-left border'>Action</th>
                    </tr>
                </thead>
                <tbody className='bg-transparent '>
                    {orders.map((order) => (
                        <tr className="border-b border-[#5b5b5b]" key={order._id}>
                            <td className="px-6 h-12">{order.items.map((item) => (
                                <div key={item._id}>
                                    <p>{item.product_id.name}</p>
                                </div>
                            ))}</td>
                            <td className="px-6 h-12">
                                {order.items.map((item) => (
                                    <div key={item._id}>
                                        <p>{item.size.unit_size} - {item.size.selected_size}</p>
                                    </div>
                                ))}
                            </td>
                            <td className="px-6 h-12">
                                {order.items.map((item) => (
                                    <div key={item._id}>
                                        <p>{item.quantity}</p>
                                    </div>
                                ))}
                            </td>
                            <td className="px-6 h-12">{order.sub_total}</td>
                            <td className="px-6 h-12">{order.payment}</td>
                            <td className="px-6 h-12">{order.destination}</td>
                            <td className="px-6 h-12">
                                <div className='flex'>
                                    <button className='border shadow p-1 rounded' onClick={() => {
                                        setId(order._id)
                                        setOpen(!open)
                                    }}>accept</button>
                                    <button className='border shadow p-1 rounded text-red-600'
                                        onClick={() => {
                                            setId(order._id)
                                            setWarning(!warning)
                                        }}
                                    >cancel</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {orders.length != 0 && <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
            <ConfirmDialog message={"Are you sure you want to proceed"} open={open} setOpen={setOpen} onConfirm={onConfirm} />
            <WarningDialog message={"Are you sure you want to cancel this order?"} warning={warning} setWarning={setWarning} onCancel={onCancel} />
        </>
    )
}

export default Table