import React, { useEffect, useState } from 'react'
import ProductLayout from '../components/ProductLayout'
import api from '../../../services/apiRequest'
import Create from './Create'
import Table from './Table'
import Loading from '../../../components/Loading'

const Category = () => {
    const [open, setOpen] = useState(false);

    const [categories, setCategories] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setLoading] = useState(false)

    
    function fetchCategory() {
        setLoading(true);
        api.get(`/api/admin/category?value=${query}`)
            .then(response => {
                setCategories(response.data)
                setLoading(false);
            })
            .catch(error => {
                console.log(error)
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchCategory();
    }, [query])

    return (
        <ProductLayout>
            {isLoading && <Loading />}
            <div className="mt-10 bg-white w-full p-4 shadow-md rounded-lg border border-slate-200">
                <div className="flex justify-between mb-4">
                    <button onClick={() => setOpen(!open)} className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded">+</button>
                    <input className="px-4 py-2 rounded border" value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Search" />
                </div>
                <Create open={open} setOpen={() => setOpen(!open)} fetchCategory={fetchCategory} />
                <Table categories={categories} setLoading={setLoading} />
            </div>
        </ProductLayout>
    )
}

export default Category