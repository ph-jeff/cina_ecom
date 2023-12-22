import React, { useEffect, useState } from 'react'
import ProductLayout from '../components/ProductLayout'
import api from '../../../services/apiRequest'
import Create from './Create'
import Table from './Table'
import Loading from '../../../components/Loading';
import TableHeader from '../../../components/TableHeader'

const Brand = () => {
    const [open, setOpen] = useState(false);

    const [brands, setBrands] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const [query, setQuery] = useState("")
    const [limit, setLimit] = useState(5)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1);

    function fetchBrand(){
        setLoading(true);
        api.get(`/api/admin/brand?value=${query}&limit=${limit}&page=${currentPage}`)
        .then(response => {
            setBrands(response.data.brand)
            setTotalPages(response.data.totalPages)
            setLoading(false);
        })
        .catch(error => {
            console.log(error)
            setLoading(false);
        })
        
    }

    useEffect(() => {
        fetchBrand()
    }, [query, limit, currentPage])

    return (
        <ProductLayout>
            {isLoading && <Loading />}
            <div className='flex w-full px-10 -mt-10 mb-[3rem]'>
                <button onClick={() => setOpen(!open)} className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded">+</button>
            </div>
            <div className='absolute bg-white h-[78vh] -mt-10 min-h-[100vh] h-fit rounded-lg ml-8 w-[95%] text-black'>
                <TableHeader limit={limit} setLimit={setLimit} query={query} setQuery={setQuery} />
                <div className='px-10 mt-4'>
                    <div className="overflow-x-auto">
                        <Table brands={brands} setLoading={setLoading} fetchBrand={fetchBrand} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </div>
            <Create open={open} setOpen={() => setOpen(!open)} fetchBrand={fetchBrand} />
        </ProductLayout>
    )
}

export default Brand