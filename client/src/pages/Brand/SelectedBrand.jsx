import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../services/apiRequest';
import ProductBox from '../../components/ProductBox';
import Loading from '../../components/Loading';

const SelectedBrand = () => {
    const { brand } = useParams();
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    function fetchBrand() {
        setLoading(true)
        api.get('/api/user/product/' + brand)
            .then(response => {
                console.log(response.data)
                setProducts(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchBrand()
    }, [])
    return (
        <>
            {isLoading && <Loading />}
            <div className="h-fit min-h-screen flex justify-center flex-col md:flex-row">
                <div className="md:w-[80%] bg-slate-200 px-4 py-4">
                    {products.length !== 0 ? (
                        <>
                            <h1 className="text-4xl font-bold mb-8 text-center md:text-left">{brand.toUpperCase()}</h1>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {products.map((product) => (
                                    <Link to={`/product/details/${product._id}`} className="bg-white rounded-lg shadow-md p-4" key={product._id}>
                                        <div className='h-[200px] overflow-hidden'>
                                            <img className='h-full w-full cover' src={product.img_url} alt="" />
                                        </div>
                                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                        <div className="flex items-center">
                                            {product.sale.is_sale ? (
                                                <>
                                                    <p className="text-gray-800 text-sm line-through">
                                                        {product.price.toLocaleString("en-PH", {
                                                            style: "currency",
                                                            currency: "PHP",
                                                        })}
                                                    </p>
                                                    <p className="text-red-500 text-sm ml-2">
                                                        {(product.price - (product.price * (product.sale.discount / 100))).toLocaleString("en-PH", {
                                                            style: "currency",
                                                            currency: "PHP",
                                                        })}
                                                    </p>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-gray-800 text-sm">
                                                        {product.price.toLocaleString("en-PH", {
                                                            style: "currency",
                                                            currency: "PHP",
                                                        })}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                        <div className='h-full w-full flex justify-center items-center text-xl font-medium'>
                            Currently no available product
                        </div>
                        </>
                    )}

                </div>

            </div>
        </>
    )
}

export default SelectedBrand