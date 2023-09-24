import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';


const Details = ({addToCart, product, addQuantity, subQuantity, quantity, inputQuantity, overlimit}) => {
    const { id } = useParams();
  return (
    <>
        {product ? (
            <>
                <div className="min-h-screen h-fit flex flex-col items-center px-2 md:px-24 py-10">
                    <div className="h-fit w-full shadow-xl p-2 flex border border-gray-300"> {/* Use flex class */}
                        {/* for image */}
                        <div className="h-64 w-80 bg-red-900 flex items-center justify-center">
                            <img className="w-full h-full object-cover" src={product.img_url} alt="" />
                        </div>
                        {/* for item */}
                        <div className="w-full h-full px-5 py-7">
                            {/* header */}
                            <div>
                                <h1 className="font-medium text-2xl line-clamp-1 text-gray-800">{product.name}</h1>
                            </div>
                            <div>
                                <p className="text-gray-800">
                                    {product.price.toLocaleString("en-PH", {
                                        style: "currency",
                                        currency: "PHP",
                                    })}
                                </p>
                            </div>
                            <div>
                                <div className="flex flex-row items-center">
                                    <button className="pb-2 rounded w-16 flex justify-center items-center text-3xl font-medium text-slate-200 bg-gray-800" onClick={subQuantity}>-</button>
                                    <input className="w-24 text-gray-800 p-2 text-center" min={1} type="number" value={quantity} onChange={inputQuantity} />
                                    <button className="pb-2 rounded w-16 flex justify-center items-center text-3xl font-medium text-slate-200 bg-gray-800" onClick={addQuantity}>+</button>
                                    <span className="px-2 text-gray-600">{product.quantity} pieces remaining</span>
                                </div>
                                {overlimit && (
                                    <>
                                        <div>
                                            <p className="text-red-600">You have reached the maximum quantity available for this item</p>
                                        </div>
                                    </>
                                )}
                                
                                <div className="mt-2">
                                    {product.quantity >= 1 ? (
                                        <>
                                            <Link to={`/check-out/${id}`}>
                                                <button className="p-2 bg-gray-800 hover:bg-gray-700 text-slate-200 rounded">Buy Now</button>
                                            </Link>
                                            <button onClick={addToCart} className="mx-2 p-2 bg-gray-800 hover:bg-gray-700 text-slate-200 rounded">Add to cart</button>
                                        </>
                                        
                                    ) : (
                                        <>
                                            <button className="p-2 bg-gray-500 text-slate-200 rounded">Buy Now</button>
                                            <button className="mx-2 p-2 bg-gray-500 text-slate-200 rounded">Add to cart</button>
                                        </>
                                    )}
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 min-h-24 h-fit w-full shadow-md p-2 border border-gray-300">
                        <h1 className="font-medium text-2xl">Prodcut Details</h1>
                        <p className="text-gray-800">{product.description}</p>
                    </div>
                    {/* <Reviews /> */}
                </div>
            </>
        ) : (
            <>
                <div className="min-h-screen flex justify-center items-center">
                    The item you are looking for is either unavailable or deleted
                </div>
            </>
        )}
    </>
  )
}

export default Details