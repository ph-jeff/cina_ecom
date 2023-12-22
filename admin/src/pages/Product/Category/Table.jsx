import React, { useState } from 'react'
import Update from './Update';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Pagination from '../../../components/Pagination';

const Table = ({categories, setLoading, totalPages, currentPage, setCurrentPage}) => {
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
                <thead className='w-full text-sm text-left text-gray-500'>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left border">Brand Name</th>
                        <th className="px-4 py-2 text-left border">Created At</th>
                        <th className="px-4 py-2 text-left border">Updated At</th>
                        <th className="px-4 py-2 text-left border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr className="bg-white border-b grap-5 hover:bg-gray-200" key={category._id}>
                            <td className="px-4 py-2 text-left border">{category.category_name}</td>
                            <td className="px-4 py-2 text-left border">{category.createdAt}</td>
                            <td className="px-4 py-2 text-left border">{category.updatedAt}</td>
                            <td className="px-4 py-2 text-left border">
                                <button className='bg-blue-200 rounded' onClick={() => handleOpen(category)}><BorderColorIcon/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {categories.length != 0 && <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
            <Update category={category} open={open} setOpen={setOpen} handleClose={handleClose} setLoading={setLoading} />
        </>
    )
}

export default Table