import React, { useEffect, useState } from 'react'
import OrderLayout from '../components/OrderLayout'
import Table from './Table'
import api from '../../../services/apiRequest'
import Range from '../../../components/Range'

const Index = () => {
    const [orders, setOrders] = useState([])
    const [query, setQuery] = useState("")
    const [limit, setLimit] = useState(5)
    
    useEffect(() => {
        function fetchOrder(){
            api.get('/api/admin/order/to-ship?value=' + query)
            .then(response => {
                console.log(response)
                setOrders(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
        fetchOrder()
    }, [query])
    
    return (
        <OrderLayout>
            <div className="mt-10 bg-white w-full p-4 shadow-md rounded-lg border border-slate-200">
                <div className="flex justify-between mb-4">
                    <Range setLimit={setLimit} />
                    <input className="px-4 py-2 rounded border" value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Search" />
                </div>
                <Table orders={orders} setOrders={setOrders} />
            </div>
        </OrderLayout>
    )
}

export default Index