import React, { useState, useEffect } from "react";
import Table from "./Table";
import ProductLayout from "../components/ProductLayout";
import api from "../../../services/apiRequest";
import LinkButton from "../../../components/LinkButton";
import Range from "../../../components/Range";


const Index = () => {
    const [products, setProduct] = useState([]);
    const [query, setQuery] = useState("");
    const [limit, setLimit] = useState(100);

    function deleteItem(id) {
        api.delete(`/api/admin/product/${id}`)
            .then(response => {
                console.log(response);
                setProduct(prev => prev.filter(product => product._id !== id));
            })
            .catch(err => {
                console.log(err);
            })
    }

    async function fetchProduct() {
        api.get(`/api/admin/product?value=${query}&limit=${limit}`)
            .then(response => {
                console.log(response);
                setProduct(response.data);
            })
            .catch(err => {
                console.log(err.response.data);
            })
    };

    useEffect(() => {
        fetchProduct();
    }, [query, limit]);
    // when query value is change, useEffect is reload

    return (
        <ProductLayout>
            <div className="mt-10 bg-white w-full p-4 shadow-md rounded-lg border border-slate-200">
                <div className="flex justify-between mb-4">
                    <LinkButton params={'/product/create'} actionName={'+'} />
                    <input className="px-4 py-2 rounded border" value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Search" />
                </div>
                {/* <div>
                    <Range setLimit={setLimit} />
                </div> */}
                <Table products={products} deleteItem={deleteItem} />
            </div>
        </ProductLayout>

        // <ProductLayout>
        //     <div className="mt-10 bg-gray-100 w-full p-6 shadow-lg rounded-lg">
        //         <div className="flex justify-between items-center mb-4">
        //             <LinkButton params={'/product/create'} actionName={'+'} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" />
        //             <input className="px-4 py-2 rounded border focus:outline-none" value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Search" />
        //         </div>
        //         <div className="mb-4">
        //             <Range setLimit={setLimit} />
        //         </div>
        //         <Table products={products} deleteItem={deleteItem} />
        //     </div>
        // </ProductLayout>

    )
}

export default Index