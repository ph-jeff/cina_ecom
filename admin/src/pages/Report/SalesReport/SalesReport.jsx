import React, { useEffect, useState } from 'react'
import ReportLayout from '../components/ReportLayout';
import Range from '../../../components/Range';
import api from '../../../services/apiRequest'
import DetailsModal from './DetailsModal';

const SalesReport = () => {
    const [query, setQuery] = useState("");
    const [limit, setLimit] = useState(5);
    const [sales, setSales] = useState([]);
    const [open, setOpen] = useState(false);
    const [salesId, setSalesId] = useState("");

    function fetchSales(){
        api.get('/api/admin/report/sales')
        .then(response => {
            console.log(response)
            setSales(response.data);
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchSales();
    }, [])

    return (
        <ReportLayout>
            <div className="mt-10 bg-white w-full p-4 shadow-md rounded-lg border border-slate-200">
                <div className="flex justify-between mb-4">
                    <Range setLimit={setLimit} />
                    <input className="px-4 py-2 rounded border" value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Search" />
                </div>
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead className="w-full text-sm text-left text-gray-500">
                        <tr className="bg-gray-100">
                            <th className='py-2 px-4 text-left border'>Product</th>
                            <th className='py-2 px-4 text-left border'>Quantity</th>
                            <th className='py-2 px-4 text-left border'>Date Purchase</th>
                            <th className='py-2 px-4 text-left border'>Amount</th>
                            <th className='py-2 px-4 text-left border'>Customer</th>
                            <th className='py-2 px-4 text-left border'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sale) => (
                            <tr key={sale._id}>
                                <td className='py-2 px-4 text-left border'>
                                    {sale.items.map((item) => (
                                        <div key={item._id}>
                                            {item.product_id.name}
                                        </div>
                                    ))}
                                </td>
                                <td className='py-2 px-4 text-left border'>
                                    {sale.items.map((item) => (
                                        <div key={item._id}>
                                            {item.quantity}
                                        </div>
                                    ))}
                                </td>
                                <td className='py-2 px-4 text-left border'>{sale.createdAt}</td>
                                <td className='py-2 px-4 text-left border'>{sale.sub_total.toLocaleString("en-PH", { style: "currency", currency: "PHP" })}</td>
                                <td className='py-2 px-4 text-left border'>{sale.user_id.email}</td>
                                <td className='py-2 px-4 text-left border'>
                                    {/* <a href="#" className='underline rounded px-2 py-1 bg-gray-200'>view</a> */}
                                    <button onClick={() => {
                                        setOpen(!open)
                                        setSalesId(sale._id)
                                    }} className='underline rounded px-2 py-1 bg-gray-200'>view</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <DetailsModal open={open} setOpen={() => setOpen(!open)} salesId={salesId} />
            </div>
        </ReportLayout>
    )
}

export default SalesReport