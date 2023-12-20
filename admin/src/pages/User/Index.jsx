import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/apiRequest';
import Table from './Table';
import HeadingMark from '../../components/HeadingMark';
import TableHeader from '../../components/TableHeader';

const Index = () => {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");
    const [limit, setLimit] = useState(5);

    function fetchUser(){
        api.get(`/api/admin/users?value=${query}`)
        .then((response) => {
            console.log(response.data)
            setUsers(response.data)
        })
    }

    useEffect(() => {
        fetchUser();
    }, [query])
    
    return (
        <div className='relative bg-[#FED32C] h-fit min-h-[38vh] text-[#515151]'>
            <div className='pt-10 px-8'>
                <p className='text-[18px] font-bold tracking-wide'>Users</p>
            </div>
            <div className='flex w-full px-10 mt-10 mb-4'>
            </div>

            <div className='absolute bg-white h-[78vh] -mt-10 min-h-[100vh] h-fit rounded-lg ml-8 w-[95%] text-black'>
                <TableHeader limit={limit} setLimit={setLimit} query={query} setQuery={setQuery} />
                <Table users={users} />
            </div>
        </div>
    )
}

export default Index