import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import api from '../../services/apiRequest';
import ProductBox from '../../components/ProductBox';

const Index = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('value');
    const [products, setProducts] = useState([]);

    function fetchSearchItem() {
        api.get(`/api/user/product/search?value=${query}`)
            .then((response) => {
                console.log(response.data);
                setProducts(response.data)
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    useEffect(() => {
        fetchSearchItem();
    }, [query])

    return (
        <>
            <div className="h-fit flex justify-center items-center bg-slate-200">
                <div className='h-fit min-h-screen w-[80%] bg-slate-300 flex flex-wrap flex justify-center overflow-hidden'>
                    {products.length != 0 ? (
                        <>
                            {products.map((product) => (
                                <Link to={`/product/details/${product._id}`} key={product._id} className='h-fit'>
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