import React, { useEffect, useState } from 'react'
import api from '../../services/apiRequest'
import { Link } from 'react-router-dom'

const Index = () => {
    const [brands, setBrands] = useState([])
    useEffect(() => {
        function fetchBrand() {
            api.get('/api/user/brand')
                .then(response => {
                    console.log(response.data)
                    setBrands(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
        fetchBrand()
    }, [])
    return (
        <div className="h-fit min-h-screen bg-gray-100">
            <div className="container mx-auto p-8">
                <h1 className="text-4xl font-bold mb-8">Our Brands</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {brands.length !== 0 ? (
                        brands.map((brand) => (
                            <div
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                                key={brand._id}
                            >
                                <img
                                    src={brand.img_url}
                                    alt={brand.name}
                                    className="w-full h-auto"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold">{brand.name}</h2>
                                    <p className="text-gray-600">{brand.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="w-full text-center text-gray-600">
                            No products available
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Index