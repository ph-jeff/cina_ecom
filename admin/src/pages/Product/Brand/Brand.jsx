import React, { useEffect, useState } from 'react'
import ProductLayout from '../components/ProductLayout'
import api from '../../../services/apiRequest'
import Create from './Create'
import Table from './Table'
import Loading from '../../../components/Loading';

const Brand = () => {
    const [open, setOpen] = useState(false);

    const [brands, setBrands] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setLoading] = useState(false);

    function fetchBrand(){
        setLoading(true);
        api.get(`/api/admin/brand?value=${query}`)
        .then(response => {
            setBrands(response.data)
            setLoading(false);
        })
        .catch(error => {
            console.log(error)
            setLoading(false);
        })
        
    }

    useEffect(() => {
        fetchBrand()
    }, [query])

    return (
        <ProductLayout>
            {isLoading && <Loading />}
            <div className="mt-10 bg-white w-full p-4 shadow-md rounded-lg border border-slate-200">
                <div className="flex justify-between mb-4">
                    <button onClick={() => setOpen(!open)} className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded">+</button>
                    <input className="px-4 py-2 rounded border" value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Search" />
                </div>
                <Create open={open} handleClose={() => setOpen(!open)} fetchBrand={fetchBrand} />
                <Table brands={brands} setLoading={setLoading} fetchBrand={fetchBrand} />
            </div>
        </ProductLayout>
    )
}

export default Brand