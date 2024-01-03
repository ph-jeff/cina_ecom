import React, { useEffect, useState } from 'react'
import ProductLayout from "../components/ProductLayout";
import Loading from '../../../components/Loading';
import TableHeader from '../../../components/TableHeader';
import api from '../../../services/apiRequest';
import Table from './Table';

const Archive = () => {
    const [products ,setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const [query, setQuery] = useState("")
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")
    const [limit, setLimit] = useState(5)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1);

    async function fetchProduct() {
        setLoading(true);
        api.get(`/api/admin/product/archive?value=${query}&limit=${limit}&page=${currentPage}&date_from=${dateFrom}&date_to=${dateTo}`)
            .then(response => {
                console.log(response);
                setProducts(response.data.product);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            })
            .catch(err => {
                console.log(err.response.data);
                setLoading(false);
            })
    };

    useEffect(() => {
        fetchProduct();
    }, [query, limit, currentPage, dateFrom, dateTo]);

    return (
        <ProductLayout>
            {isLoading && <Loading />}
            <div className='absolute bg-white h-[78vh] -mt-10 min-h-[70vh] h-fit rounded-lg ml-8 w-[95%] text-black'>
                <TableHeader
                    limit={limit} setLimit={setLimit}
                    query={query} setQuery={setQuery}
                    dateFrom={dateFrom} setDateFrom={setDateFrom}
                    dateTo={dateTo} setDateTo={setDateTo}
                />
                <div className='px-10 mt-4'>
                    <div className="overflow-x-auto">
                        <Table products={products} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </div>
        </ProductLayout>
    )
}

export default Archive