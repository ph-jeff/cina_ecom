import React, { useState, useEffect } from "react";
import Table from "./Table";
import ProductLayout from "../components/ProductLayout";
import api from "../../../services/apiRequest";
import LinkButton from "../../../components/LinkButton";
import Loading from '../../../components/Loading'
import Range from "../../../components/Range";
import TableHeader from "../../../components/TableHeader";


const Index = () => {
    const [products, setProduct] = useState([]);
    const [query, setQuery] = useState("");
    const [limit, setLimit] = useState(10000);
    const [isLoading, setLoading] = useState(false);

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
        setLoading(true);
        api.get(`/api/admin/product?value=${query}&limit=${limit}`)
            .then(response => {
                console.log(response);
                setProduct(response.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err.response.data);
                setLoading(false);
            })
    };

    useEffect(() => {
        fetchProduct();
    }, [query, limit]);
    // when query value is change, useEffect is reload

    return (
        <ProductLayout>
            {isLoading && <Loading />}
            <div className='flex w-full px-10 -mt-10 mb-[3rem]'>
                <LinkButton params={'/product/create'} actionName={'Create Product'} />
            </div>
            <div className='absolute bg-white h-[78vh] -mt-10 min-h-[100vh] h-fit rounded-lg ml-8 w-[95%] text-black'>
                <TableHeader limit={limit} setLimit={setLimit} query={query} setQuery={setQuery} />
                <div className='px-10 mt-4'>
                    <div className="overflow-x-auto">
                        <Table products={products} deleteItem={deleteItem} />
                    </div>
                </div>
            </div>
        </ProductLayout>
    )
}

export default Index