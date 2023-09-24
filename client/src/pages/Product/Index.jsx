import React, { useEffect, useState } from 'react'
import api from '../../services/apiRequest';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchParam, setSearchParam] = useState('keyword');
  const [query, setQuery] = useState('bower');
  const [min, setMin] = useState();
  const [max, setMax] = useState();

  function fetchProducts(){
    api.get(`/api/product/search?${searchParam}=${query}`)
    .then(response => {
      console.log(response.data);
      setProducts(response.data);
    })
    .catch(err => {
      console.log(err.response.data);
    })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen h-fit px-2 md:px-24 py-10 md:flex block">
        {/* filter */}
        <div className='h-fit md:h-80 w-full md:w-60 bg-gray-800'>
            <div className='text-slate-200 px-2 py-1'>
                {/* <h1>Category</h1>
                <ul>
                    <li>Apparel</li>
                    <li>Shoes</li>
                    <li>Tops</li>
                    <li>Tattered</li>
                    <li>Bikini</li>
                </ul> */}
                <div className='flex'>
                  <div>
                    <label htmlFor="min">Min</label>
                    <input className='w-10' type="number" value={min} placeholder='min' />
                  </div>
                  <div>
                    <label htmlFor="max">Max</label>
                    <input className='w-10' type="number" value={max} placeholder='max' />
                  </div>
                </div>
            </div>
        </div>
        {/* products */}
        <div className='h-fit md:h-80 w-full flex flex-wrap justify-center'>
          {products.map(product => (
            <div className="m-5 h-64 w-80 sm:w-56 bg-gray-800 shadow-md" key={product._id}>
              <div className="w-full h-40">
                  <img
                      className="w-full h-full object-cover"
                      src={product.img_url}
                      alt=""
                      loading="lazy"
                  />
              </div>
              <div className="px-2 pt-1">
                  <h1 className="text-slate-100 text-sm overflow-hidden truncate ">
                      {product.name}
                  </h1>
                  <p className="text-slate-100 text-sm overflow-hidden truncate ">
                      {product.description}
                  </p>
                  <p className="text-slate-100 text-sm">
                      {product.price.toLocaleString("en-PH", {
                      style: "currency",
                      currency: "PHP",
                      })}
                  </p>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Products