import React, { useState } from 'react'

const Index = () => {
    const [brands, setBrands] = useState([])
  return (
    <div className="h-screen flex justify-center items-center">
            {/* filter */}
            <div className='h-[100vh] w-[20%]'>

            </div>
            {/* items */}
            <div className='h-[100vh] min-h-fit w-[80%] bg-slate-200 flex flex-wrap flex overflow-hidden'>
                {brands.length != 0 ? (
                    <>
                        {setBrands.map((product) => (
                            <Link to={`/product/details/${product._id}`} >
                                <div className="m-5 h-64 w-80 sm:w-56 bg-gray-800 shadow-md" key={product._id}>
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
  )
}

export default Index