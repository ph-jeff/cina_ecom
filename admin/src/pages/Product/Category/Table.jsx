import React, { useState } from 'react'
import Update from './Update';

const Table = ({categories, setLoading}) => {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState({})

    const handleOpen = (category) => {
        setCategory(category)
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };

    return (
        <>
            <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Brand Name</th>
                        <th className="px-4 py-2 text-left">Created At</th>
                        <th className="px-4 py-2 text-left">Updated At</th>
                        <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category._id}>
                            <td className="px-4 py-2">{category.category_name}</td>
                            <td className="px-4 py-2">{category.createdAt}</td>
                            <td className="px-4 py-2">{category.updatedAt}</td>
                            <td className="px-4 py-2">
                                <button onClick={() => handleOpen(category)}>edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Update category={category} open={open} setOpen={setOpen} handleClose={handleClose} setLoading={setLoading} />
        </>
    )
}

export default Table