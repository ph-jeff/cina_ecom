import React, { useEffect, useState } from 'react'
import ReportLayout from '../components/ReportLayout'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import api from '../../../services/apiRequest'
import Range from '../../../components/Range';

const InventoryReport = () => {
    const [query, setQuery] = useState("");
    const [limit, setLimit] = useState(5);
    const [reports, setReports] = useState([]);

    function fetchReport(){
        api.get(`/api/admin/report/inventory?value=${query}`)
        .then(response => {
            console.log(response)
            setReports(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchReport();
    }, [query])

    return (
        <ReportLayout>
            <div className="mt-10 bg-white w-full p-4 shadow-md rounded-lg border border-slate-200 overflow-x-auto">
                <div className="flex justify-between mb-4">
                    <Range setLimit={setLimit} />
                    <input className="px-4 py-2 rounded border" value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Search" />
                </div>
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className='py-2 px-4 text-left border'>Product</th>
                            <th className='py-2 px-4 text-left border' colSpan="2">Beginning Amount</th>
                            <th className='py-2 px-4 text-left border' colSpan="2">Difference</th>
                            <th className='py-2 px-4 text-left border' colSpan="2">Ending Amount</th>
                            <th className='py-2 px-4 text-left border'>Date</th>
                        </tr>
                        <tr className="">
                            <th className='py-2 px-4 text-left border'>Item Name</th>
                            <th className='py-2 px-4 text-left border'>Qty</th>
                            <th className='py-2 px-4 text-left border'>Price</th>
                            <th className='py-2 px-4 text-left border'>Qty</th>
                            <th className='py-2 px-4 text-left border'>Price</th>
                            <th className='py-2 px-4 text-left border'>Qty</th>
                            <th className='py-2 px-4 text-left border'>Price</th>
                            <th className='py-2 px-4 text-left border'>Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr className="border" key={report._id}>
                                <td className='py-2 px-4 text-left border'>{report.product_name}</td>
                                <td className='py-2 px-4 text-left border'>{report.beginning_amount.quantity}</td>
                                <td className='py-2 px-4 text-left border'>{report.beginning_amount.price}</td>
                                <td className='py-2 px-4 text-left border'>{report.difference.quantity}</td>
                                <td className='py-2 px-4 text-left border'>{report.difference.price}</td>
                                <td className='py-2 px-4 text-left border'>{report.ending_amount.quantity}</td>
                                <td className='py-2 px-4 text-left border'>{report.ending_amount.price}</td>
                                <td className='py-2 px-4 text-left border'>{report.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ReportLayout>
    )
}

export default InventoryReport