import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import api from '../../services/apiRequest';

const Index = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const query = params.get('value');
    const [products, setProducts] = useState([]);

    function fetchSearchItem(){
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
        <div>
            <div className="h-screen flex justify-center items-center">
                {/* filter */}
                <div className='h-[100vh] w-[20%]'>
                    
                </div>
                {/* items */}
                <div className='h-[100vh] min-h-fit w-[80%] bg-slate-200 flex flex-wrap flex overflow-hidden'>
                {products.length != 0 ? (
                        <>
                            {products.map((product) => (
                                <Link to={`/product/details/${product._id}`} key={product._id} >
                                    <div className="m-5 h-64 w-80 sm:w-56 bg-gray-800 shadow-md">
                                        <div className="w-full h-40">
                                            <img
                                                className="w-full h-full object-cover"
                                                src={product.img_url}
                                                alt=""
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="px-2 pt-1">
                                            <h1 className="text-slate-100 text-sm overflow-hidden truncate ">
                                                {product.name}
                                            </h1>
                                            <p className="text-slate-100 text-sm overflow-hidden truncate ">
                                                {product.description}
                                            </p>
                                            <p className="text-slate-100 text-sm">
                                                {product.price.toLocaleString("en-PH", {
                                                    style: "currency",
                                                    currency: "PHP",
                                                })}
                                            </p>
                                        </div>
                                    </div>
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
        </div>
    )
}

export default Index