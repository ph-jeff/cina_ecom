import React, { useEffect, useState } from 'react'
import OrderLayout from '../components/OrderLayout'
import Table from './Table'
import api from '../../../services/apiRequest'
import Range from '../../../components/Range'
import TableHeader from '../../../components/TableHeader'
import Loading from '../../../components/Loading'

const Index = () => {
    const [orders, setOrders] = useState([])
    const [isLoading, setLoading] = useState(false);

    const [query, setQuery] = useState("")
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")
    const [limit, setLimit] = useState(5)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1);
    
    function fetchOrder(){
        setLoading(true);
        api.get(`/api/admin/order/completed?value=${query}&limit=${limit}&page=${currentPage}&date_from=${dateFrom}&date_to=${dateTo}`)
        .then(response => {
            console.log(response)
            setOrders(response.data.orders)
            setTotalPages(response.data.totalPages)
            setLoading(false);
        })
        .catch(error => {
            console.log(error)
            setLoading(false);
        })
    }

    useEffect(() => {
        fetchOrder()
    }, [query, limit, currentPage, dateFrom, dateTo])
    
    return (
        <OrderLayout>
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
                        <Table orders={orders} setOrders={setOrders} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </div>
                </div>
            </div>
        </OrderLayout>
    )
}

export default Index