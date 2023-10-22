import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/apiRequest';
import Table from './Table';
import HeadingMark from '../../components/HeadingMark';

const Index = () => {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");

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
        <div className='mt-[50px] mx-[50px]'>
            <HeadingMark title={'Users'} />
            <div className="mt-10 bg-white w-full p-4 shadow-md rounded-lg border border-slate-200">
                <div className="flex justify-between mb-4">
                    {/* <Link className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" to={'/product/create'}>Add Product</Link> */}
                    <input value={query} onChange={(e) => setQuery(e.target.value)} className="px-4 py-2 rounded border" type="search" placeholder="Search" />
                </div>
                <Table users={users} />
            </div>
        </div>
    )
}

export default Index