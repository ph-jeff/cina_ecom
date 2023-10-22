import React, { useState } from 'react'
import Update from './Update'

const Table = ({ sizes }) => {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState({})
    
    const handleOpen = (size) => {
        setSize(size)
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
                    {sizes.map((size) => (
                        <tr key={size._id}>
                            <td className="px-4 py-2">{size.unit_size}</td>
                            <td className="px-4 py-2">{size.createdAt}</td>
                            <td className="px-4 py-2">{size.updatedAt}</td>
                            <td className="px-4 py-2">
                                <button onClick={() => handleOpen(size)}>edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Update size={size} open={open} setOpen={setOpen} handleClose={handleClose} />
        </>
    )
}

export default Table