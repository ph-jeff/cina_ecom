// import React from 'react'

// const ProductBox = ({product}) => {
//     console.log(product.sale)
//     return (
//         <div className="m-5 h-64 w-80 sm:w-56 bg-gray-800 shadow-md">
//             <div className="w-full h-40">
//                 <img
//                     className="w-full h-full object-cover"
//                     src={product.img_url}
//                     alt=""
//                     loading="lazy"
//                 />
//             </div>
//             <div className="px-2 pt-1">
//                 <h1 className="text-slate-100 text-sm overflow-hidden truncate">
//                     {product.name}
//                 </h1>
//                 <p className="text-slate-100 text-sm overflow-hidden truncate">
//                     {product.description}
//                 </p>
//                 <div className="flex items-center">
//                     {product.sale.is_sale ? (
//                         <>
//                             <p className="text-slate-100 text-sm line-through">
//                                 {product.price.toLocaleString("en-PH", {
//                                     style: "currency",
//                                     currency: "PHP",
//                                 })}
//                             </p>
//                             <p className="text-red-500 text-sm ml-2">
//                                 {(product.price - (product.price * (product.sale.discount / 100))).toLocaleString("en-PH", {
//                                     style: "currency",
//                                     currency: "PHP",
//                                 })}
//                             </p>
//                         </>
//                     ) : (
//                         <>
//                             <p className="text-slate-100 text-sm">
//                                 {product.price.toLocaleString("en-PH", {
//                                     style: "currency",
//                                     currency: "PHP",
//                                 })}
//                             </p>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductBox

import React from 'react';

const ProductBox = ({ product }) => {
    return (
        <div className="group relative">
            <div className="m-5 h-64 w-80 sm:w-56 bg-gray-800 shadow-md relative group">
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
            
            <div className="hidden group-hover:block absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 shadow-lg w-96 z-50 w-[100%]">
                    <p className="text-gray-800">{product.description}</p>
                </div>
            </div>

            {/* <div className="hidden group-hover:block fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 shadow-lg w-96">
                    <p className="text-gray-800">{product.description}</p>
                </div>
            </div> */}
        </div>
    );
};

export default ProductBox;
