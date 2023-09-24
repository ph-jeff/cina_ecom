import React, { useEffect, useState } from 'react'
import ProductLayout from '../components/ProductLayout'
import api from '../../../services/apiRequest'
import Create from './Create'
import Table from './Table'

const Category = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");

    function fetchCategory() {
        api.get('/api/admin/category')
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchCategory();
    }, [])

    return (
        <ProductLayout>
            <div className="mt-10 bg-white w-full p-4 shadow-md rounded-lg border border-slate-200">
                <div className="flex justify-between mb-4">
                    <button onClick={handleOpen} className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded">+</button>
                </div>
                <div className='bg-slate-200'>
                    {/* create modal */}
                    <Create open={open} setOpen={setOpen} handleClose={handleClose} categoryName={categoryName} setCategoryName={setCategoryName} />
                </div>
                <Table categories={categories} />
            </div>
        </ProductLayout>
    )
}

export default Category