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
            <table className="w-full text-sm">
                <thead className="text-left text-gray-600 bg-[#F0F0F0] border-b border-zinc-400">
                    <tr>
                        <th scope="col" className="font-semibold px-6 h-12 border border-[#b0b0b0]">Item Name</th>
                        <th scope="col" className="font-semibold px-6 h-12 border border-[#b0b0b0]">Size</th>
                        <th scope="col" className="font-semibold px-6 h-12 border border-[#b0b0b0]">Quantity</th>
                        <th scope="col" className="font-semibold px-6 h-12 border border-[#b0b0b0]">Price</th>
                        <th scope="col" className="font-semibold px-6 h-12 border border-[#b0b0b0]">Mode</th>    
                        <th scope="col" className="font-semibold px-6 h-12 border border-[#b0b0b0]">Destination</th>
                        <th scope="col" className="font-semibold px-6 h-12 border border-[#b0b0b0]">Action</th>
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
                                <button className='border shadow p-1 rounded' onClick={() => {
                                    setId(order._id)
                                    setOpen(!open)
                                }}>accept</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* <table className="w-full table-auto border-collapse border border-gray-300">
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
                            <td className='py-2 px-4 text-left border'>
                                {order.items.map(item => (
                                    <div key={item._id}>
                                        <p>{item.quantity}</p>
                                    </div>
                                ))}
                            </td>
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
            </table> */}
            <ConfirmDialog message={"Are you sure you want to proceed"} open={open} setOpen={setOpen} onConfirm={onConfirm} />
        </>
    )
}

export default Table