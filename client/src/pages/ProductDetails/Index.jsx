import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
// import Reviews from "./Reviews";
import cart_icon from "../../assets/cart.svg";
import api from "../../services/apiRequest";
import { toast } from "react-hot-toast";
import Loading from "../../components/Loading";
import NotFound from "../NotFound/Index";
import Details from "./Details";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    const [overlimit, setOverlimit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function addQuantity(){
        if(product.quantity > quantity){
            setQuantity(parseInt(quantity) + 1);
        }else{
            setOverlimit(true)
        }
    }

    function subQuantity(){
        if(quantity > 1){
            setQuantity(parseInt(quantity) - 1);
            setOverlimit(false)
        }
    }

    function inputQuantity(e){
        if(product.quantity > e.target.value){
            setQuantity(e.target.value);
            setOverlimit(false)
        }else{
            setQuantity(product.quantity);
            setOverlimit(true)
        }
    }

    async function addToCart(){
        setIsLoading(true);
        api.post(`/api/user/cart/${id}`, {
            quantity: quantity,
        })
        .then((response) => {
            setQuantity(1)
            toast.success('Successfully added to the cart');
            setIsLoading(false);
        })
        .catch(err => {
            toast.error(`${err.response.data.error}`)
            if(err.response.status === 401){
                navigate('/login');
            }
            setIsLoading(false);
        })
    }
    
    async function fetchProduct(){
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
        <div>
            {isLoading && <Loading />}
            <Details addToCart={addToCart} product={product} addQuantity={addQuantity} subQuantity={subQuantity} quantity={quantity} inputQuantity={inputQuantity} overlimit={overlimit} />
        </div>
    );
};

export default ProductDetails;
