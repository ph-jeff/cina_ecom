import React, { useEffect, useState } from 'react'
import ProductLayout from '../components/ProductLayout'
import api from '../../../services/apiRequest'
import Create from './Create'
import Table from './Table'
import Loading from '../../../components/Loading'
import TableHeader from '../../../components/TableHeader'

const Category = () => {
    const [open, setOpen] = useState(false);

    const [categories, setCategories] = useState([]);
    const [query, setQuery] = useState("");
    const [limit, setLimit] = useState(5);
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
            <div className='flex w-full px-10 -mt-10 mb-[3rem]'>
                <button onClick={() => setOpen(!open)} className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded">Create Category</button>
            </div>
            <div className='absolute bg-white h-[78vh] -mt-10 min-h-[100vh] h-fit rounded-lg ml-8 w-[95%] text-black'>
                <TableHeader limit={limit} setLimit={setLimit} query={query} setQuery={setQuery} />
                <div className='px-10 mt-4'>
                    <div className="overflow-x-auto">
                        <Table categories={categories} setLoading={setLoading} />
                    </div>
                </div>
            </div>
            <Create open={open} setOpen={() => setOpen(!open)} fetchCategory={fetchCategory} />
        </ProductLayout>
    )
}

export default Category