import React from 'react'
import { Link } from 'react-router-dom';
import ProductBox from '../../components/ProductBox';

const LatestProducts = ({ products }) => {
    return (
        <div className="h-fit min-h-screen flex justify-center flex-col block px-10 py-10 bg-[#C4A353]">
            <h1 className="text-gray-800 font-medium text-center">
                Latest Product
            </h1>
            <div className="flex flex-wrap flex justify-center">
                {products.length != 0 ? (
                    <>
                        {products.map((product) => (
                            <Link to={`/product/details/${product._id}`} key={product._id}>
                                <ProductBox product={product} />
                            </Link>
                        ))}
                    </>
                ) : (
                    <>
                        <div>
                            No product available
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}

export default LatestProducts