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
    const [limit, setLimit] = useState(5)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1);
    
    function fetchOrder(){
        setLoading(true);
        api.get('/api/admin/order/completed?value=' + query)
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
    }, [query])
    
    return (
        <OrderLayout>
            {isLoading && <Loading />}
            <div className='absolute bg-white h-[78vh] -mt-10 min-h-[100vh] h-fit rounded-lg ml-8 w-[95%] text-black'>
                <TableHeader limit={limit} setLimit={setLimit} query={query} setQuery={setQuery} />
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