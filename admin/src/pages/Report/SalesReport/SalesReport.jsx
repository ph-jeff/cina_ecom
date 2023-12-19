import React, { useEffect, useState } from 'react'
import ReportLayout from '../components/ReportLayout';
import Range from '../../../components/Range';
import SearchIcon from '@mui/icons-material/Search';
import api from '../../../services/apiRequest'
import DetailsModal from './DetailsModal';

const SalesReport = () => {
    const [query, setQuery] = useState("");
    const [limit, setLimit] = useState(5);
    const [sales, setSales] = useState([]);
    const [open, setOpen] = useState(false);
    const [salesId, setSalesId] = useState("");

    function fetchSales() {
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

    const styles = {
        search_icon: { fontSize: 18 },
    };

    return (
        <ReportLayout>
            <div className='absolute bg-white h-[78vh] -mt-10 rounded-lg ml-8 w-[95%] text-black'>
                <div className='mt-8 px-10 text-sm'>

                    {/* <div className="relative flex justify-end w-full gap-3 mb-14">
                        <div className="absolute inset-y-0 right-[185px] flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 flex flex-end text-[#686868] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>    
                        </div>
                        <input className='block pl-10 py-2 px-4 w-38 rounded-xl border border-[#686868] text-sm' type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search ...' style={{ backgroundColor: 'transparent' }} />
                    </div> */}
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
                        <table className="w-full text-sm text-left">
                            <thead className="bg-[#F0F0F0] border-b border-zinc-400">
                                <tr>
                                    <th scope='col' className="px-6 h-12">Product</th>
                                    <th scope='col' className="px-6 h-12">Quantity</th>
                                    <th scope='col' className="px-6 h-12">Date Purchase</th>
                                    <th scope='col' className="px-6 h-12">Amount</th>
                                    <th scope='col' className="px-6 h-12">Customer</th>
                                    <th scope='col' className="px-6 h-12">Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-transparent '>
                                {sales.map((sale) => (
                                    <tr key={sale._id} className="border-b border-[#5b5b5b]">
                                        <td className="px-6 h-12">
                                            {sale.items.map((item) => (
                                                <div key={item._id}>
                                                    {item.product_id.name}
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-6 h-12">
                                            {sale.items.map((item) => (
                                                <div key={item._id}>
                                                    {item.quantity}
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-6 h-12">{sale.createdAt}</td>
                                        <td className="px-6 h-12">{sale.sub_total.toLocaleString("en-PH", { style: "currency", currency: "PHP" })}</td>
                                        <td className="px-6 h-12">{sale.user_id.email}</td>
                                        <td className="px-6 h-12">
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
                </div>
            </div>
        </ReportLayout >
    )
}

export default SalesReport