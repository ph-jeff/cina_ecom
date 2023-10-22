import React from 'react'

const ProductBox = ({product}) => {
    console.log(product.sale)
    return (
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
                <h1 className="text-slate-100 text-sm overflow-hidden truncate">
                    {product.name}
                </h1>
                <p className="text-slate-100 text-sm overflow-hidden truncate">
                    {product.description}
                </p>
                <div className="flex items-center">
                    {product.sale.is_sale ? (
                        <>
                            <p className="text-slate-100 text-sm line-through">
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
                            <p className="text-slate-100 text-sm">
                                {product.price.toLocaleString("en-PH", {
                                    style: "currency",
                                    currency: "PHP",
                                })}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductBox