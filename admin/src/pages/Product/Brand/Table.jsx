import React, { useEffect, useState } from 'react'
import Update from './Update';

const Table = ({brands}) => {
    const [open, setOpen] = useState(false);
    const [brand, setBrand] = useState("");
    
    const handleOpen = (brand) => {
        setBrand(brand)
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
                    {brands.map((brand) => (
                        <tr key={brand._id}>
                            <td className="px-4 py-2">{brand.brand_name}</td>
                            <td className="px-4 py-2">{brand.createdAt}</td>
                            <td className="px-4 py-2">{brand.updatedAt}</td>
                            <td className="px-4 py-2">
                                <button onClick={() => {handleOpen(brand)}}>edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Update brand={brand} open={open} setOpen={setOpen} handleClose={handleClose} />
        </>
    )
}

export default Table