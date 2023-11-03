import React, { useEffect, useState } from 'react'
import api from '../../services/apiRequest'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'

const Index = () => {
    const [brands, setBrands] = useState([])
    const [isLoading, setLoading] = useState(false);

    function fetchBrand() {
        setLoading(true)
        api.get('/api/user/brand')
            .then(response => {
                console.log(response.data)
                setBrands(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchBrand()
    }, [])
    return (
        <>
        {isLoading && <Loading />}
            <div className="h-fit min-h-screen flex justify-center flex-col md:flex-row bg-[#C4A353]">
                {/* Brand filter */}
                {/* <div className="md:w-[20%] bg-[#C4A353] px-3 py-3">
                <h2 className="text-slate-200 text-center text-xl font-semibold">Brands</h2>
                {brands.map((brand) => (
                    <div
                        className="bg-gray-900 rounded-lg shadow-md my-2 cursor-pointer"
                        key={brand._id}
                    >
                        <div className="p-4">
                            <h2 className="text-slate-200 text-center text-xl font-semibold">
                                {brand.brand_name}
                            </h2>
                        </div>
                    </div>
                ))}
            </div> */}
                {/* List of items */}
                <div className="md:w-[80%] px-4 py-4">
                    <h1 className="text-4xl font-bold mb-8 text-center md:text-left">Our Brands</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {brands.map((brand) => (
                            <Link to={`/brand/${brand.slug}`} className="bg-white rounded-lg shadow-md p-2" key={brand._id}>
                                {/* Replace the content below with the item details */}
                                <div className='h-[200px] overflow-hidden rounded'>
                                    <img className='h-full w-full cover' src={brand.img_url} alt="" />
                                </div>
                                <h2 className="mt-2 text-xl text-center text-white font-semibold bg-gradient-to-r from-slate-700 from-30% via-slate-700 via-70% to-black to-100%">{brand.brand_name}</h2>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Index