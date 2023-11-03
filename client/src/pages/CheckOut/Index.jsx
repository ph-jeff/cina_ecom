import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../services/apiRequest';
import Loading from "../../components/Loading";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null)
    const [user, setUser] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [overlimit, setOverlimit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState("");

    const [selectedSizeUnit, setSelectedSizeUnit] = useState('US');
    const [selectedSize, setSelectedSize] = useState(null);
    const [sizeError, setSizeError] = useState(false);

    const handleSizeUnitChange = (event) => {
        setSelectedSizeUnit(event.target.value);
        setSelectedSize(null);
    };

    const handleSizeRadioChange = (event) => {
        setSelectedSize(event.target.value);
        setSizeError(false);
    };

    const sizeOptions = {
        US: ['S', 'M', 'L', 'XL'],
        EU: ['36', '38', '40', '42', '43'],
        UK: ['8', '10', '12', '14'],
        cm: ['30', '32', '34', '36'],
        in: ['12', '14', '16', '18'],
    };

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
            if (!selectedSize) {
                setSizeError(true)
                setIsLoading(false);
                return;
            }

            if (mode === "") {
                throw Error('Please Select Payment')
            }

            api.post(`/api/user/product/checkout/${id}`, {
                quantity,
                mode,
                unit_size: selectedSizeUnit,
                selected_size: selectedSize,
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
        setIsLoading(true);
        api.get(`/api/user/product/checkout/${id}`)
            .then((response) => {
                console.log(response.data)
                setProduct(response.data.product)
                setUser(response.data.user)
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err.response);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        fetchItem()
    }, [])
    return (
        <>
            {isLoading && <Loading />}
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#C4A353] py-10 px-4 md:px-24">
                {product ? (
                    <>
                        <div className="w-full max-w-screen-md bg-white rounded-lg overflow-hidden mb-4">
                            <div className='p-5'>
                                <p><span className='font-medium'>Customer Name: </span>{user.firstname} {user.middlename} {user.lastname}</p>
                                <p><span className='font-medium'>Address: </span>{user.house_number} {user.zip_code} {user.barangay} {user.municipal} {user.province}</p>
                                <Link to={'/account'} className='underline underline-offset-1'>update information</Link>
                            </div>
                        </div>
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
                                    <div className="mt-2">
                                        <label className="block font-bold" htmlFor="sizeUnitSelect">
                                            Select Size Unit:
                                        </label>
                                        <select
                                            id="sizeUnitSelect"
                                            value={selectedSizeUnit}
                                            onChange={handleSizeUnitChange}
                                            className="p-2 border rounded-lg"
                                        >
                                            <option value="US">US</option>
                                            <option value="EU">EU</option>
                                            <option value="UK">UK</option>
                                            <option value="cm">cm</option>
                                            <option value="in">in</option>
                                        </select>

                                        <div className="mt-1">
                                            <p className="font-semibold">Sizes available in {selectedSizeUnit}:</p>
                                            <div className="flex space-x-2">
                                                {sizeOptions[selectedSizeUnit].map((size, index) => (
                                                    <label
                                                        key={index}
                                                        className={`flex items-center space-x-2 px-2 py-1 rounded-lg border border-gray-400 cursor-pointer ${selectedSize === size
                                                            ? 'bg-blue-200 border-blue-500'
                                                            : 'bg-white'
                                                            }`}
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="size"
                                                            value={size}
                                                            onChange={handleSizeRadioChange}
                                                            checked={selectedSize === size}
                                                            className="sr-only"
                                                        />
                                                        {size}
                                                    </label>
                                                ))}
                                            </div>
                                            <p className="font-semibold mt-2">
                                                Selected size: {selectedSize}
                                                {sizeError && <span className="font-semibold text-red-900">Please select a size</span>}
                                            </p>

                                        </div>
                                    </div>
                                    <p className="text-xl text-gray-800 mb-4">
                                    {product.sale.is_sale ? (
                                        <>
                                            <span className="text-gray-800 text-sm line-through">
                                                {product.price.toLocaleString("en-PH", {
                                                    style: "currency",
                                                    currency: "PHP",
                                                })}
                                            </span>
                                            <span className="text-red-500 text-sm ml-2">
                                                {(product.price - (product.price * (product.sale.discount / 100))).toLocaleString("en-PH", {
                                                    style: "currency",
                                                    currency: "PHP",
                                                })}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-gray-800 text-sm">
                                                {product.price.toLocaleString("en-PH", {
                                                    style: "currency",
                                                    currency: "PHP",
                                                })}
                                            </span>
                                        </>
                                    )}
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
                                        <select value={mode} onChange={(e) => setMode(e.target.value)} name="" id="" className="w-full text-slate-200 hover:bg-gray-700 px-2 py-1 bg-gray-800 rounded mb-2">
                                            <option value="" >Please Select</option>
                                            <option value="cod">COD</option>
                                            <option value="e-pay">E-Pay</option>
                                        </select>
                                        <form className='w-full flex justify-center' onSubmit={checkout}>
                                            <button className="bg-gray-800 text-slate-200 rounded-lg py-2 px-6 text-xl font-medium hover:bg-gray-700">
                                                Place Order
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="min-h-screen flex justify-center items-center">
                        The item you are looking for is either unavailable or deleted
                    </div>
                )}
            </div>
        </>
    )
}

export default Index