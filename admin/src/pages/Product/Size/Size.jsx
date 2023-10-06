import React, { useEffect, useState } from 'react'
import ProductLayout from '../components/ProductLayout'
import api from '../../../services/apiRequest';
import Create from './Create';
import Table from './Table';

const Size = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [sizes, setSizes] = useState([]);
    const [sizeOrigin, setSizeOrigin] = useState("");
    const [query, setQuery] = useState("");

    function fetchSize() {
        api.get(`/api/admin/size?value=${query}`)
            .then(response => {
                setSizes(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchSize();
    }, [query])
    return (
        <ProductLayout>
            <div className="mt-10 bg-white w-full p-4 shadow-md rounded-lg border border-slate-200">
                <div className="flex justify-between mb-4">
                    <button onClick={handleOpen} className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded">+</button>
                    <input className="px-4 py-2 rounded border" value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Search" />
                </div>
                    <Create open={open} setOpen={setOpen} handleClose={handleClose} sizeOrigin={sizeOrigin} setSizeOrigin={setSizeOrigin} />
                <Table sizes={sizes} />
            </div>
        </ProductLayout>
    )
}

export default Size