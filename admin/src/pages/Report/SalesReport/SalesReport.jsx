import React, { useEffect, useState } from 'react'
import ReportLayout from '../components/ReportLayout';
import Range from '../../../components/Range';
import SearchIcon from '@mui/icons-material/Search';
import api from '../../../services/apiRequest'
import DetailsModal from './DetailsModal';
import DateRange from '../../../components/DateRange';
import TableHeader from '../../../components/TableHeader';
import Loading from '../../../components/Loading';
import Pagination from '../../../components/Pagination';

const SalesReport = () => {
    const [sales, setSales] = useState([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [salesId, setSalesId] = useState("");

    const [query, setQuery] = useState("")
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")
    const [limit, setLimit] = useState(5)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1);

    function fetchSales() {
        setLoading(true);
        api.get(`/api/admin/report/sales?value=${query}&limit=${limit}&page=${currentPage}&date_from=${dateFrom}&date_to=${dateTo}`)
            .then(response => {
                console.log(response);
                setSales(response.data.sales);
                setTotalPages(response.data.totalPages);
                setLoading(false);
            })
            .catch(error => {
                console.log(error)
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchSales();
    }, [query, limit, currentPage, dateFrom, dateTo])

    const styles = {
        search_icon: { fontSize: 18 },
    };

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
                        <table className="w-full text-sm text-left">
                            <thead className="bg-[#F0F0F0] border-b border-zinc-400">
                                <tr>
                                    <th scope='col' className="px-6 h-12">Product</th>
                                    {/* <th scope='col' className="px-6 h-12">Quantity</th> */}
                                    <th scope='col' className="px-6 h-12">Date Purchase</th>
                                    <th scope='col' className="px-6 h-12">Amount</th>
                                    {/* <th scope='col' className="px-6 h-12">Customer</th> */}
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
                                        {/* <td className="px-6 h-12">
                                            {sale.items.map((item) => (
                                                <div key={item._id}>
                                                    {item.quantity}
                                                </div>
                                            ))}
                                        </td> */}
                                        <td className="px-6 h-12">{sale.createdAt}</td>
                                        <td className="px-6 h-12">{sale.sub_total.toLocaleString("en-PH", { style: "currency", currency: "PHP" })}</td>
                                        {/* <td className="px-6 h-12">{sale.user_id.email}</td> */}
                                        <td className="px-6 h-12">
                                            <button onClick={() => {
                                                setOpen(!open)
                                                setSalesId(sale._id)
                                            }} className='underline rounded px-2 py-1 bg-gray-200'>view</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {sales.length != 0 && <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
                        <DetailsModal open={open} setOpen={() => setOpen(!open)} salesId={salesId} />
                    </div>
                </div>
            </div>
        </ReportLayout >
    )
}

export default SalesReport