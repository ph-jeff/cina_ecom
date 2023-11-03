import React from 'react'
import { Link } from 'react-router-dom'

const Items = ({ cart, sub, add, removeItem }) => {
    return (
        <>
            {cart.map((item) => (
                <div className="h-auto w-full my-4 flex flex-col md:flex-row bg-white shadow-xl rounded p-4" key={item._id}>
                    {/* Product Details */}
                    <div className="md:w-1/2 flex flex-col md:flex-row items-center md:items-start">
                        <div className="w-full md:w-1/3 h-32 md:h-full overflow-hidden">
                            <img className="w-full h-full object-cover" src={item.product_id.img_url} alt="" />
                        </div>
                        <div className="w-full md:w-2/3 md:mx-4 mt-4 md:mt-0">
                            <p className="text-gray-800 font-semibold mb-2">{item.product_id.name}</p>
                            <p className="text-gray-600 line-clamp-3 mb-2">{item.product_id.description}</p>
                            <Link to={`/product/details/${item.product_id._id}`} className="text-blue-500 underline hover:text-blue-700">View Item</Link>
                        </div>
                    </div>

                    {/* Product Actions */}
                    <div className="md:w-1/2 flex flex-col md:flex-row items-center justify-center mt-4 md:mt-0">
                        <div className="flex items-center mb-2 md:mb-0 mr-4">
                            <span className="mr-2">Size: {item.size.selected_size}</span>
                            <span className="text-gray-800">
                                {(item.product_id.price * item.quantity).toLocaleString("en-PH", {
                                    style: "currency",
                                    currency: "PHP",
                                })}
                            </span>
                        </div>

                        <div className="flex items-center mb-2 md:mb-0 mx-4">
                            <button onClick={() => sub(item.product_id._id)} className="px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold">-</button>
                            <span className="mx-2 text-gray-800">{item.quantity}</span>
                            <button onClick={() => add(item.product_id._id)} className="px-3 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold">+</button>
                        </div>

                        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition duration-300" onClick={() => removeItem(item.product_id._id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </>

    )
}

export default Items