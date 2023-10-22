import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import api from '../../services/apiRequest';
import ProductBox from '../../components/ProductBox';

const Index = () => {
    const [products, setProducts] = useState([])
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('value');

    function fetchProduct(){
        api.get(`/api/user/product/category?value=${query}`)
        .then(response => {
            console.log(response)
            setProducts(response.data)
        })
    }
    useEffect(() => {
        fetchProduct()
    }, [query])
    return (
        <div className="h-screen flex justify-center items-center">
            <div className='h-[100vh] min-h-fit w-[80%] bg-slate-200 flex flex-wrap flex overflow-hidden'>
                {products.length != 0 ? (
                    <>
                        {products.map((product) => (
                            <Link to={`/product/details/${product._id}`} key={product._id} >
                                <ProductBox product={product} />
                            </Link>
                        ))}
                    </>
                ) : (
                    <>
                        <div className='w-full flex justify-center items-center'>
                            No product available
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Index