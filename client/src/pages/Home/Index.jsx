import React, { useEffect, useState } from "react";

import CarouselComponent from "./CarouselComponent";
import Loading from "../../components/Loading";
import LatestProducts from "./LatestProducts";

import api from "../../services/apiRequest";

const Index = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProduct] = useState([]);
    const [featuredProduct, setFeaturedProduct] = useState([])

    function fetchFeaturedProduct(){
        api.get('/api/user/product/featured')
        .then((response) => {
            console.log(response)
            setFeaturedProduct(response.data)
        })
        .catch((err) => {
            console.log(err.response)
        })
    }

    function fetchProduct() {
        setIsLoading(true);
        api.get('/api/user/product/latest')
        .then(response => {
            console.log(response);
            setProduct(response.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        })
    };
    useEffect(() => {
        fetchFeaturedProduct();
        fetchProduct();
    }, [setIsLoading]);

    return (
        <div className="min-h-screen">
            {isLoading && <Loading />}
            <CarouselComponent featuredProduct={featuredProduct} />
            <LatestProducts products={products} />
        </div>
    );
};

export default Index;
