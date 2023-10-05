import React from 'react'
import { Link } from 'react-router-dom'

const Items = ({ cart, sub, add, removeItem }) => {
    return (
        <>
            {cart.map((item) => (
                <div className="h-40 w-full my-2 flex flex-row bg-white shadow-xl" key={item._id}>
                    <div className="h-full w-1/2 p-2 flex">
                        <div className="w-1/2 md:w-1/3 h-full">
                            <img className="w-full h-full object-cover" src={item.product_id.img_url} alt="" />
                        </div>
                        <div className="w-1/2 md:w-2/3 h-full mx-2">
                            <p className="line-clamp-1 text-gray-800">{item.product_id.name}</p>
                            <p className="line-clamp-1 text-gray-800">{item.product_id.description}</p>
                            <Link to={`/product/details/${item.product_id._id}`} className="underline underline-offset-1" >View Item</Link>
                        </div>
                    </div>
                    <div className="h-full w-1/2 grid grid-cols-3 gap-5">
                        <div className="p-4 flex justify-center items-center">
                            <span>
                                {(item.product_id.price * item.quantity).toLocaleString("en-PH", {
                                    style: "currency",
                                    currency: "PHP",
                                })}
                            </span>
                        </div>
                        <div className="p-4 flex justify-center items-center">
                            <button onClick={() => sub(item.product_id._id)} className="pb-2 rounded w-16 flex justify-center items-center text-3xl font-medium text-slate-200 bg-gray-800">-</button>
                            <input className="w-24 text-gray-800 p-2 text-center" value={item.quantity} min={1} type="number" readOnly />
                            <button onClick={() => add(item.product_id._id)} className="pb-2 rounded w-16 flex justify-center items-center text-3xl font-medium text-slate-200 bg-gray-800">+</button>
                        </div>
                        <div className="p-4 flex justify-center items-center">
                            <span className="text-gray-800 px-2 py-1 rounded hover:bg-gray-700" onClick={() => removeItem(item.product_id._id)}>
                                Delete
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </>

    )
}

export default Items