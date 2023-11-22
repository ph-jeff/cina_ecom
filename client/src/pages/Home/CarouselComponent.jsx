import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import headphone_1 from "../../assets/headphone_1.jpg";
import headphone_2 from "../../assets/headphone_2.jpg";
import headphone_3 from "../../assets/headphone_3.jpg";
import api from "../../services/apiRequest";
import { Link } from "react-router-dom";

const CarouselComponent = ({ featuredProduct }) => {

    return (
        <div>
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showThumbs={false}
                interval={3000}
                transitionTime={500}
            >
                {featuredProduct.map((product, index) => (
                    // <div className="relative h-screen bg-red-900" key={index}>
                    //     <img className="w-full h-full object-cover" src={product.img_url} alt="" />
                    //     <Link
                    //         to={`/check-out/${product._id}`}
                    //         className="absolute bottom-10 left-1/2 transform -translate-x-1/2 p-2 bg-white text-sm rounded-md hover:bg-white hover:text-gray-800"
                    //     >
                    //     Buy Now
                    //     </Link>
                    // </div>


                    // <div className="relative h-screen bg-red-900" key={index}>
                    //     <img className="w-full h-full object-cover" src={product.img_url} alt="" />

                    //     {/* Display discount or sale amount */}
                    //     {product.sale.is_sale && (
                    //         <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded-md">
                    //             {`${product.sale.discount}% OFF`}
                    //         </div>
                    //     )}

                    //     <Link
                    //         to={`/check-out/${product._id}`}
                    //         className="absolute bottom-10 left-1/2 transform -translate-x-1/2 p-2 bg-white text-sm rounded-md hover:bg-white hover:text-gray-800"
                    //     >
                    //         Buy Now
                    //     </Link>
                    // </div>

                    <div className="relative h-screen bg-red-900" key={index}>
                        <img className="w-full h-full object-cover" src={product.img_url} alt="" />

                        {/* Display discount or sale amount */}
                        {product.sale.is_sale && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-700 text-[5rem] text-white px-3 py-2 rounded-md">
                                <p>HOT SALE</p>
                                <p>{`${product.sale.discount}% OFF`}</p>
                            </div>
                        )}

                        <Link
                            to={`/check-out/${product._id}`}
                            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 p-2 bg-white text-sm rounded-md hover:bg-white hover:text-gray-800"
                        >
                            Buy Now
                        </Link>
                    </div>
                ))}
            </Carousel>
        </div>

    );
};

export default CarouselComponent;
