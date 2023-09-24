import React, { useState, useEffect } from "react";
import Table from "./Table";
import ProductLayout from "../components/ProductLayout";
import api from "../../../services/apiRequest";
import LinkButton from "../../../components/LinkButton";


const Index = () => {
    const [products, setProduct] = useState([]);
    const [query, setQuery] = useState("");
    const [limit, setLimit] = useState(5);

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
                <div>
                    <select onChange={(e) => setLimit(e.target.value)} name="" id="">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
                <Table products={products} deleteItem={deleteItem} />
            </div>
        </ProductLayout>
    )
}

export default Index