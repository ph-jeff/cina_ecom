import React from 'react'
import LinkButton from '../../../components/LinkButton'

const ProductLayout = ({ children }) => {
    return (
        <div className='mt-[50px] mx-[50px]'>
            <div className="flex border bg-gray-800">
                <LinkButton params={'/product'} actionName={'Product'} />
                <LinkButton params={'/product/category'} actionName={'Category'} />
                <LinkButton params={'/product/size'} actionName={'Size'} />
                <LinkButton params={'/product/brand'} actionName={'Brand'} />
            </div>
            {/* <div className="mt-10 bg-white w-full p-4 shadow-md rounded-lg border border-slate-200">
                
            </div> */}
            {children}
        </div>
    )
}

export default ProductLayout