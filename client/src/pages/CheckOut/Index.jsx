import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/apiRequest';
import Loading from "../../components/Loading";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [overlimit, setOverlimit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState("");

    function addQuantity() {
        if (product.quantity > quantity) {
            setQuantity(parseInt(quantity) + 1);
        } else {
            setOverlimit(true)
        }
    }

    function subQuantity() {
        if (quantity > 1) {
            setQuantity(parseInt(quantity) - 1);
            setOverlimit(false)
        }
    }

    function inputQuantity(e) {
        if (product.quantity > e.target.value) {
            setQuantity(e.target.value);
            setOverlimit(false)
        } else {
            setQuantity(product.quantity);
            setOverlimit(true)
        }
    }

    function checkout(e) {
        setIsLoading(true);
        e.preventDefault();
        try {
            if (mode === "") {
                throw Error('Please Select Payment')
            }
            api.post(`/api/user/product/checkout/${id}`, {
                quantity,
                mode,
            })
                .then((response) => {
                    console.log(response)
                    setIsLoading(false);
                    // navigate('/transaction/success/' + response.data.url.link)
                    window.location.href = response.data.url
                })
                .catch((error) => {
                    setIsLoading(false);
                    toast.error(error.message)
                })
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message)
        }
        
    }

    function fetchItem() {
        api.get(`/api/user/product/checkout/${id}`)
            .then((response) => {
                console.log(response.data)
                setProduct(response.data)
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    useEffect(() => {
        fetchItem()
    }, [])
    return (
        <>
            {isLoading && <Loading />}
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-200 py-10 px-4 md:px-24">
                {product ? (
                    <div className="w-full max-w-screen-md bg-white rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/2 p-6">
                                <img
                                    className="w-full h-full object-cover" // Add object-cover class here
                                    src={product.img_url}
                                    alt={product.name}
                                />
                            </div>
                            <div className="w-full md:w-1/2 p-6">
                                <h2 className="text-3xl font-medium text-gray-800 mb-4">
                                    {product.name}
                                </h2>
                                <p className="text-lg text-gray-600 mb-4">{product.description}</p>
                                <p className="text-xl text-gray-800 mb-4">
                                    {parseInt(product.price).toLocaleString("en-PH", {
                                        style: "currency",
                                        currency: "PHP",
                                    })}
                                </p>
                                <div className="flex items-center mb-4">
                                    <button
                                        className="text-gray-800 border rounded-full border-slate-400 w-12 h-12 flex justify-center items-center text-xl font-bold"
                                        onClick={subQuantity}
                                    >
                                        -
                                    </button>
                                    <input
                                        className="w-20 h-12 text-gray-800 text-center"
                                        min={1}
                                        type="number"
                                        value={quantity}
                                        onChange={inputQuantity}
                                    />
                                    <button
                                        className="text-gray-800 border rounded-full border-slate-400 w-12 h-12 flex justify-center items-center text-xl font-bold"
                                        onClick={addQuantity}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 p-6">
                                <div className="bg-gray-200 rounded-lg p-4">
                                    <h3 className="text-xl font-medium text-gray-800 mb-4">
                                        Order Summary
                                    </h3>
                                    <div className="flex justify-between mb-2">
                                        <span>Item Price:</span>
                                        <span>
                                            {parseInt(product.price).toLocaleString("en-PH", {
                                                style: "currency",
                                                currency: "PHP",
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span>Quantity:</span>
                                        <span>{quantity}</span>
                                    </div>
                                    <div className="flex justify-between mb-4">
                                        <span>Total:</span>
                                        <span>
                                            {(
                                                parseInt(product.price) * quantity
                                            ).toLocaleString("en-PH", {
                                                style: "currency",
                                                currency: "PHP",
                                            })}
                                        </span>
                                    </div>
                                    <form onSubmit={checkout}>
                                        <button className="bg-gray-800 text-slate-200 rounded-lg py-2 px-6 text-xl font-medium hover:bg-gray-700">
                                            Place Order
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <select value={mode} onChange={(e) => setMode(e.target.value)} name="" id="" className="w-full text-slate-200 hover:bg-gray-700 px-2 py-1 bg-gray-800 rounded">
                            <option value="" >Please Select</option>
                            <option value="cod">COD</option>
                            <option value="e-pay">E-Pay</option>
                        </select>

                    </div>
                ) : (
                    <div className="text-3xl font-medium text-gray-800">
                        Invalid Item
                    </div>
                )}
            </div>
        </>
    )
}

export default Index