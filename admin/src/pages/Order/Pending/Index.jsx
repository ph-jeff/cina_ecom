import React, { useEffect, useState } from 'react'
import OrderLayout from '../components/OrderLayout'
import Table from './Table'
import api from '../../../services/apiRequest'
import Range from '../../../components/Range'
import DateRange from '../../../components/DateRange'
import TableHeader from '../../../components/TableHeader'
import Loading from '../../../components/Loading'

const Index = () => {
    const [orders, setOrders] = useState([])
    const [query, setQuery] = useState("")
    const [limit, setLimit] = useState(5)
    const [isLoading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        function fetchOrder(){
            api.get('/api/admin/order?value=' + query)
            .then(response => {
                console.log(response)
                setOrders(response.data)
                setLoading(false);
            })
            .catch(error => {
                console.log(error)
                setLoading(false);
            })
        }
        fetchOrder()
    }, [query])
    
    return (
        <OrderLayout>
            {isLoading && <Loading />}
            <div className='absolute bg-white h-[78vh] -mt-10 min-h-[100vh] h-fit rounded-lg ml-8 w-[95%] text-black'>
                <TableHeader limit={limit} setLimit={setLimit} query={query} setQuery={setQuery} />
                <div className='px-10 mt-4'>
                    <div className="overflow-x-auto">
                        <Table orders={orders} setOrders={setOrders} />
                    </div>
                </div>
            </div>
        </OrderLayout>
    )
}

export default Index