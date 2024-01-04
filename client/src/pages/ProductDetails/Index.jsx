import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import Reviews from "./Reviews";
import cart_icon from "../../assets/cart.svg";
import api from "../../services/apiRequest";
import { toast } from "react-hot-toast";
import Loading from "../../components/Loading";
import NotFound from "../NotFound/Index";
import Details from "./Details";
import UnitSizeConverter from "./UnitSizeConverter";
import TryItOnModal from './TryItOnModal';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    const [overlimit, setOverlimit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [selectedSizeUnit, setSelectedSizeUnit] = useState('US');
    const [selectedSize, setSelectedSize] = useState(null);
    const [sizeError, setSizeError] = useState(false);
    const [open, setOpen] = useState(false);

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

    async function addToCart() {
        setIsLoading(true);
        if (!selectedSize) {
            setSizeError(true)
            setIsLoading(false);
            return;
        }
        api.post(`/api/user/cart/${id}`, {
            quantity: quantity,
            unit_size: selectedSizeUnit,
            selected_size: selectedSize,
        })
            .then((response) => {
                setQuantity(1)
                toast.success('Successfully added to the cart');
                setIsLoading(false);
                setSizeError(false);
            })
            .catch(err => {
                toast.error(`${err.response.data.error}`)
                if (err.response.status === 401) {
                    navigate('/login');
                }
                setIsLoading(false);
                setSizeError(false);
            })
    }

    async function fetchProduct() {
        setIsLoading(true);
        api.get(`/api/user/product/details/${id}`)
            .then(response => {
                console.log(response);
                setProduct(response.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err.response);
                // toast.error(`${err.response.data.error}`);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        fetchProduct();
    }, [])
    return (
        <>
            {isLoading && <Loading />}
            {product ? (
                <>
                    <div className="flex flex-col lg:flex-row flex-wrap px-2 md:px-24 py-10 min-h-screen h-fit bg-slate-200">
                        <div className="p-4 w-full lg:w-1/2 flex items-center justify-center bg-white">
                            <div className="bg-red-900">
                                <img className="w-full h-full object-cover" src={product.img_url} alt="" />
                            </div>
                        </div>

                        <div className="p-4 w-full lg:w-1/2 bg-white">
                            <div className="w-full h-full px-5 py-7">
                                {/* header */}
                                <div>
                                    <h1 className="font-medium text-2xl text-gray-800">{product.name}</h1>
                                    <p>{product.description}</p>
                                </div>

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

                                <div>
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
                                                {/* <button onClick={() => setOpen(!open)} className="mx-2 p-2 bg-gray-800 hover:bg-gray-700 text-slate-200 rounded">Try it on</button> */}
                                                {/* <Link to={'/product/3d-view/' + id} className="mx-2 p-2 bg-slate-200 hover:bg-slate-300 text-gray-800 rounded">3D View</Link> */}
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
            <TryItOnModal open={open} closeModal={() => setOpen(!open)} />
        </ >
    );
};

export default ProductDetails;
