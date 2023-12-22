import React, { useEffect, useState } from 'react'
import Update from './Update';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Pagination from '../../../components/Pagination';

const Table = ({brands, fetchBrand, totalPages, currentPage, setCurrentPage}) => {
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
                        <th className="px-4 py-2 text-left border">Brand Name</th>
                        <th className="px-4 py-2 text-left border">Created At</th>
                        <th className="px-4 py-2 text-left border">Updated At</th>
                        <th className="px-4 py-2 text-left border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {brands.map((brand) => (
                        <tr className="bg-white border-b grap-5 hover:bg-gray-200" key={brand._id}>
                            <td className="px-4 py-2 text-left border">{brand.brand_name}</td>
                            <td className="px-4 py-2 text-left border">{brand.createdAt}</td>
                            <td className="px-4 py-2 text-left border">{brand.updatedAt}</td>
                            <td className="px-4 py-2 text-left border">
                                <button className='bg-blue-200 rounded' onClick={() => {handleOpen(brand)}}><BorderColorIcon/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <Update brand={brand} open={open} setOpen={setOpen} handleClose={handleClose} fetchBrand={fetchBrand} />
        </>
    )
}

export default Table