import React, { useEffect, useState } from 'react'
import Update from './Update';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const Table = ({brands, fetchBrand}) => {
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
                <thead className="w-full text-sm text-left text-gray-500">
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left">Brand Name</th>
                        <th className="px-4 py-2 text-left">Created At</th>
                        <th className="px-4 py-2 text-left">Updated At</th>
                        <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {brands.map((brand) => (
                        <tr className="bg-white border-b grap-5 hover:bg-gray-200" key={brand._id}>
                            <td className="px-4 py-2">{brand.brand_name}</td>
                            <td className="px-4 py-2">{brand.createdAt}</td>
                            <td className="px-4 py-2">{brand.updatedAt}</td>
                            <td className="px-4 py-2">
                                <button className='bg-blue-200 rounded' onClick={() => {handleOpen(brand)}}><BorderColorIcon/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Update brand={brand} open={open} setOpen={setOpen} handleClose={handleClose} fetchBrand={fetchBrand} />
        </>
    )
}

export default Table