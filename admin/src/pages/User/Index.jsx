import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/apiRequest';
import Table from './Table';
import HeadingMark from '../../components/HeadingMark';
import TableHeader from '../../components/TableHeader';
import Loading from '../../components/Loading';

const Index = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const [query, setQuery] = useState("")
    const [dateFrom, setDateFrom] = useState("")
    const [dateTo, setDateTo] = useState("")
    const [limit, setLimit] = useState(5)
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(1);

    function fetchUser(){
        setLoading(true)
        api.get(`/api/admin/users?value=${query}&limit=${limit}&page=${currentPage}&date_from=${dateFrom}&date_to=${dateTo}`)
        .then((response) => {
            console.log(response.data)
            setUsers(response.data.users)
            setTotalPages(response.data.totalPages)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchUser();
    }, [query, limit, currentPage, dateFrom, dateTo])
    
    return (
        <>
            {isLoading && <Loading />}
            <div className='relative bg-[#FED32C] h-fit min-h-[38vh] text-[#515151]'>
                <div className='pt-10 px-8'>
                    <p className='text-[18px] font-bold tracking-wide'>Users</p>
                </div>
                <div className='flex w-full px-10 mt-10 mb-4'>
                </div>

                <div className='absolute bg-white h-[78vh] -mt-10 min-h-[70vh] h-fit rounded-lg ml-8 w-[95%] text-black'>
                    <TableHeader
                        limit={limit} setLimit={setLimit}
                        query={query} setQuery={setQuery}
                        dateFrom={dateFrom} setDateFrom={setDateFrom}
                        dateTo={dateTo} setDateTo={setDateTo}
                    />
                    <Table users={users} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            </div>
        </>
    )
}

export default Index