import React from 'react'
import OrderLayout from '../components/OrderLayout'
import Table from './Table'

const Index = () => {
    return (
        <OrderLayout>
            <div className="mt-10 bg-white w-full p-4 shadow-md rounded-lg border border-slate-200">
                <div>
                    Completed
                </div>
                <Table />
            </div>
        </OrderLayout>
    )
}

export default Index