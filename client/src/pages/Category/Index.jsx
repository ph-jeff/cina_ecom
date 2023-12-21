import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom';
import api from '../../services/apiRequest';
import ProductBox from '../../components/ProductBox';
import Loading from '../../components/Loading';

const Index = () => {
    const [products, setProducts] = useState([])
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('value');

    const [isLoading, setLoading] = useState(false);

    function fetchProduct(){
        setLoading(true)
        api.get(`/api/user/product/category?value=${query}`)
        .then(response => {
            console.log(response)
            setProducts(response.data)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchProduct()
    }, [query])
    return (
        <>
            {isLoading && <Loading />}
            <div className="min-h-screen h-fit flex justify-center items-center bg-slate-200">
                <div className='w-[80%] justify-center items-center flex flex-wrap flex overflow-hidden'>
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
        </>
    )
}

export default Index