import React, { useEffect, useState } from 'react'
import ReportLayout from '../components/ReportLayout'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import api from '../../../services/apiRequest'
import Range from '../../../components/Range';
import DateRange from '../../../components/DateRange';
import TableHeader from '../../../components/TableHeader';
import Loading from '../../../components/Loading';
import Pagination from '../../../components/Pagination';

const InventoryReport = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const [query, setQuery] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    function fetchReport(){
        setLoading(true);
        api.get(`/api/admin/report/inventory?value=${query}&limit=${limit}&page=${currentPage}&date_from=${dateFrom}&date_to=${dateTo}`)
        .then(response => {
            console.log(response)
            setReports(response.data.inventory)
            setTotalPages(response.data.totalPages)
            setLoading(false);
        })
        .catch(error => {
            console.log(error)
            setLoading(false);
        })
    }

    useEffect(() => {
        fetchReport();
    }, [query, limit, currentPage, dateFrom, dateTo])

    return (
        <ReportLayout>
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
                                <tr className="border-b border-[#5b5b5b]" key={report._id}>
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
                        {reports.length != 0 && <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
                    </div>
                </div>
            </div>
        </ReportLayout>
    )
}

export default InventoryReport