import React, { useEffect, useState } from 'react'
import ProductLayout from '../components/ProductLayout'
import api from '../../../services/apiRequest'
import Create from './Create'
import Table from './Table'

const Brand = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [brands, setBrands] = useState([]);
    const [brandName, setBrandName] = useState("");

    function fetchBrand(){
        api.get('/api/admin/brand')
        .then(response => {
            setBrands(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchBrand()
    }, [])

    return (
        <ProductLayout>
            <div className="mt-10 bg-white w-full p-4 shadow-md rounded-lg border border-slate-200">
                <div className="flex justify-between mb-4">
                    <button onClick={handleOpen} className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded">+</button>
                    
                </div>
                <div className='bg-slate-200'>
                    {/* create modal */}
                    <Create open={open} setOpen={setOpen} handleClose={handleClose} brandName={brandName} setBrandName={setBrandName} />
                </div>
                <Table brands={brands} />
            </div>
        </ProductLayout>
    )
}

export default Brand