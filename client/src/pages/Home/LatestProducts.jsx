import React from 'react'
import { Link } from 'react-router-dom';

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