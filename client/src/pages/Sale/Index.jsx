import React, { useEffect, useState } from 'react'
import api from '../../services/apiRequest';
import { Link } from 'react-router-dom';
import ProductBox from '../../components/ProductBox';
import Loading from '../../components/Loading';

const Index = () => {
    const [saleProduct, setSaleProduct] = useState([]);
    const [isLoading, setLoading] = useState(false);
    function fetchSaleProduct() {
        setLoading(true)
        api.get('/api/user/product/sale')
            .then((response) => {
                console.log(response)
                setSaleProduct(response.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.response)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchSaleProduct();
    }, []);

    return (
        <>
            {isLoading && <Loading />}
            <div className="h-fit min-h-screen flex justify-center flex-col block px-10 py-10 bg-[#C4A353]">
                {saleProduct.length !== 0 ? (
                    <>
                        <h1 className="text-gray-800 text-[1.5rem] font-medium text-center">
                            Sale
                        </h1>
                        <div className="flex flex-wrap flex justify-center">
                            {saleProduct.map((product) => (
                                <Link to={`/product/details/${product._id}`} key={product._id}>
                                    <ProductBox product={product} />
                                </Link>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-gray-800 font-medium text-center">
                        There's no product available
                    </div>
                )}
            </div>
        </>
    )
}

export default Index