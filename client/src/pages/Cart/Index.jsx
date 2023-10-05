import React, { useEffect, useState } from "react";
import delete_icon from "../../assets/delete.svg";
import api from "../../services/apiRequest";
import { toast } from 'react-hot-toast';
import Loading from "../../components/Loading";
import { useNavigate } from 'react-router-dom';
import Items from "./Items";

const CartPage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState("");

    function checkout() {
        setIsLoading(true);
        try {
            if (mode === "") {
                throw Error('Please Select Payment')
            }

            console.log(mode)

            api.post('/api/user/checkout', {
                mode: mode,
            })
                .then((response) => {
                    setIsLoading(false);
                    // navigate('/transaction/success/' + response.data.url.link)
                    window.location.href = response.data.url;
                })
                .catch((err) => {
                    console.log(err)
                    setIsLoading(false);
                    toast.error(err.response.data.error);
                })
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }

    }

    function add(id) {
        setIsLoading(true);
        api.put(`/api/user/cart/add/${id}`)
            .then((response) => {
                setCart(response.data.items);
                console.log(response.data.items)
                setIsLoading(false);
            })
            .catch((err) => {
                toast.error(err.response.data.error);
                setIsLoading(false);
            });
    }

    function sub(id) {
        setIsLoading(true);
        api.put(`/api/user/cart/sub/${id}`)
            .then((response) => {
                setCart(response.data.items);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.error);
                setIsLoading(false);
            });
    }

    function removeItem(id) {
        console.log(id)
        setIsLoading(true);
        api.delete(`/api/user/cart/${id}`)
            .then((response) => {
                setCart(prev => prev.filter(product => product.product_id._id !== id))
                // setCart(response.data.items); //same as above
                toast.success(`The item is removed`)
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                // toast.error(err.response.data.error)
                setIsLoading(false);
            });
    }

    function fetchCart() {
        setIsLoading(true);
        api.get("/api/user/cart/")
            .then((response) => {
                console.log(response.data);
                setIsLoading(false);
                setCart(response.data);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    }
    useEffect(() => {
        fetchCart();
    }, [])

    return (
        <div>
            {isLoading && <Loading />}
            <div className="min-h-screen h-fit flex flex-col justify-center items-center px-2 md:px-24 py-10 bg-slate-200">
                <h1 className="text-gray-800 text-3xl">Your Cart</h1>
                {cart.length !== 0 ? (
                    <>
                        <Items cart={cart} sub={sub} add={add} removeItem={removeItem} />
                        <div className="w-full md:w-1/2 md:pr-4 mb-4 bg-white rounded-lg shadow-md p-4">
                            <div className="w-full h-1/8 mb-4">
                                <select value={mode} onChange={(e) => setMode(e.target.value)} name="" id="" className="w-full text-slate-200 hover:bg-gray-700 px-2 py-1 bg-gray-800 rounded">
                                    <option value="" >Please Select</option>
                                    <option value="cod">COD</option>
                                    <option value="e-pay">E-Pay</option>
                                </select>
                            </div>
                            <div className="w-full h-1/8">
                                <button onClick={checkout} className="w-full text-slate-200 hover:bg-gray-700 px-2 py-1 bg-gray-800 rounded">Checkout</button>
                            </div>
                        </div>
                    </>

                ) : (
                    <>
                        <div className="h-fit w-full my-2 flex justify-center items-center">
                            <span className="text-gray-800">Your cart is empty</span>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
};

export default CartPage;
