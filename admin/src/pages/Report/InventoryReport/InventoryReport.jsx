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
            <div className='absolute bg-[#ffffff] h-[78vh] -mt-10 rounded-lg ml-8 w-[95%] text-black'>
                <div className='mt-8 px-10 text-sm'>
                    <div className='flex justify-between mb-10'>
                        <div className='flex gap-3 mt-4'>
                            <div className='w-44'>
                                <p className='w-full mb-1'>Date From</p>
                                <input className='py-2 px-4 w-full rounded-md border border-gray-300 text-sm text-[#4f4f4f]' type="date" />
                            </div>
                            <div className='w-44'>
                                <p className='w-full mb-1'>Date To</p>
                                <input className='py-2 px-4 w-full rounded-md border border-gray-300 text-sm text-[#4f4f4f] ' type="date" />
                            </div>
                        </div>
                        <div className='flex gap-2'>
                            <div className='border border-gray-300 h-20 w-40'></div>
                            <div className='border border-gray-300 h-20 w-40'></div>
                        </div>
                    </div> 
                    <div className='flex justify-between w-full'>
                        <div className='flex items-center gap-2 text-[14px]'>
                            <label className="">Show</label>
                            <select value={limit} onChange={(e) => setLimit(e.target.value)} className="p-1.5 rounded-md border border-gray-300 text-sm text-[#424242]">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                            <span>Entries</span>
                        </div>
                        <div className="relative flex justify-end w-full gap-3">
                            <div className="absolute inset-y-0 right-[185px] flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 flex flex-end text-[#686868] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>    
                            </div>
                            <input className='block pl-10 py-2 px-4 w-38 rounded-xl border border-[#686868] text-sm' type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search ...' style={{ backgroundColor: 'transparent' }} />
                        </div>
                    </div>
                </div>
                <div className='px-10 mt-4'>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-left text-gray-600 bg-[#F0F0F0] border-b border-zinc-400">
                                <tr className=''>
                                    <th scope="col" className="font-bold px-6 h-12 border border-[#b0b0b0]">Product</th>
                                    <th scope="col" className="font-bold px-6 h-12 border border-[#b0b0b0]" colSpan="2">Beginning Amount</th>
                                    <th scope="col" className="font-bold px-6 h-12 border border-[#b0b0b0]" colSpan="2">Difference</th>
                                    <th scope="col" className="font-bold px-6 h-12 border border-[#b0b0b0]" colSpan="2">Ending Amount</th>
                                    <th scope="col" className="font-bold px-6 h-12 border border-[#b0b0b0]">Date</th>    
                                </tr>
                                <tr>
                                    <th scope="col" className="font-semibold px-6 h-12 border border-[#b0b0b0]">Item Name</th>
                                    <th scope="col" className="font-semibold px-6 h-12 border border-[#b0b0b0]">Qty</th>
                                    <th scope="col" className="font-semibold px-6 h-12 border border-[#b0b0b0]">Price</th>
                                    <th scope="col" className="font-semibold px-6 h-12 border border-[#b0b0b0]">Qty</th>
                                    <th scope="col" className="font-semibold px-6 h-12 border border-[#b0b0b0]">Price</th>    
                                    <th scope="col" className="font-semibold px-6 h-12 border border-[#b0b0b0]">Qty</th>
                                    <th scope="col" className="font-semibold px-6 h-12 border border-[#b0b0b0]">Price</th>
                                    <th scope="col" className="font-semibold px-6 h-12 border border-[#b0b0b0   ]">Order Date</th>    
                                </tr>
                            </thead>
                            <tbody className='bg-transparent '>
                                {reports.map((report) => (
                                <tr className="border-b border-[#5b5b5b] key={report._id}">
                                    <td className="px-6 h-12">{report.product_name}</td>
                                    <td className="px-6 h-12">{report.beginning_amount.quantity}</td>
                                    <td className="px-6 h-12">{report.beginning_amount.price}</td>
                                    <td className="px-6 h-12">{report.difference.quantity}</td>
                                    <td className="px-6 h-12">{report.difference.price}</td>
                                    <td className="px-6 h-12">{report.ending_amount.quantity}</td>
                                    <td className="px-6 h-12">{report.ending_amount.price}</td>
                                    <td className="px-6 h-12">{report.createdAt}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



            {/* <div className="mt-10 bg-white w-full p-4 shadow-md rounded-lg border border-slate-200 overflow-x-auto">
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
            </div> */}
        </ReportLayout>
    )
}

export default InventoryReport