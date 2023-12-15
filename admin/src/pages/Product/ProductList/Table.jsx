import React from 'react'
import { Link } from "react-router-dom";

import BorderColorIcon from '@mui/icons-material/BorderColor';

const Table = ({ products, deleteItem }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead className='w-full text-sm text-left text-gray-500'>
                    <tr className="bg-gray-100">
                        {/* <th className="px-4 py-2 text-left">Item</th> */}
                        <th className="px-4 py-2 text-left">Product Name</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Brand</th>
                        <th className="px-4 py-2 text-left">Category</th>
                        <th className="px-4 py-2 text-left">Quantity</th>
                        <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length !== 0 ? (
                        <>
                            {products.map((product) => (
                                <tr className="bg-white border-b grap-5 hover:bg-gray-200" key={product._id}>
                                    {/* <td>
                                        <div className="w-16 h-16 overflow-hidden rounded-full">
                                            <img
                                                className="w-full h-full object-cover"
                                                src={product.img_url}
                                                alt=""
                                            />
                                        </div>
                                    </td> */}
                                    <td className="px-4 py-2">{product.name}</td>
                                    <td className="px-4 py-2">{product.price.toLocaleString("en-PH", { style: "currency", currency: "PHP" })}</td>
                                    <td className="px-4 py-2">{product.brand}</td>
                                    <td className="px-4 py-2">{product.category}</td>
                                    <td className="px-4 py-2">{product.quantity}</td>
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