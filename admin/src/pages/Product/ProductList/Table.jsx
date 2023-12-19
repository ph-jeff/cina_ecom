import React from 'react'
import { Link } from "react-router-dom";

import BorderColorIcon from '@mui/icons-material/BorderColor';

const Table = ({ products, deleteItem }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead className='w-full text-sm text-left text-gray-500'>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left border">Item</th>
                        <th className="px-4 py-2 text-left border">Product Name</th>
                        <th className="px-4 py-2 text-left border">Price</th>
                        <th className="px-4 py-2 text-left border">Brand</th>
                        <th className="px-4 py-2 text-left border">Category</th>
                        <th className="px-4 py-2 text-left border">Quantity</th>
                        <th className="px-4 py-2 text-left border">Status</th>
                        <th className="px-4 py-2 text-left border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length !== 0 ? (
                        <>
                            {products.map((product) => (
                                <tr className="bg-white border-b grap-5 hover:bg-gray-200" key={product._id}>
                                    <td className="px-4 py-2 text-left border">
                                        <div className="w-full h-16 overflow-hidden rounded">
                                            <img
                                                className="w-full h-full object-cover"
                                                src={product.img_url}
                                                alt=""
                                            />
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 text-left border">{product.name}</td>
                                    <td className="px-4 py-2 text-left border">{product.price.toLocaleString("en-PH", { style: "currency", currency: "PHP" })}</td>
                                    <td className="px-4 py-2 text-left border">{product.brand}</td>
                                    <td className="px-4 py-2 text-left border">{product.category}</td>
                                    <td className="px-4 py-2 text-left border">{product.quantity}</td>
                                    <td className="px-4 py-2 text-left border">{product.quantity <= 0 ? (
                                        <span className='text-sm text-white rounded bg-red-600 py-1 px-2'>
                                            No Stock!
                                        </span>
                                    ) : (
                                        <span className='text-sm bg-green-600 text-white px-2 py-1 rounded'>
                                            Good
                                        </span>
                                    )}</td>
                                    <td className="px-4 py-2">
                                        <Link to={`/product/update/${product._id}`} className="bg-blue-200 rounded hover:underline mr-2"><BorderColorIcon /></Link>
                                        {/* <button onClick={() => deleteItem(product._id)} className="text-red-500 hover:underline">Delete</button> */}
                                    </td>
                                </tr>
                            ))}
                        </>
                    ) : (
                        <tr className="hover:bg-gray-200">
                            <td colSpan="5" className="text-center py-4">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table