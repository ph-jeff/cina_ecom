import React from 'react'
import LinkButton from '../../../components/LinkButton'
import HeadingMark from '../../../components/HeadingMark'
import { Link } from 'react-router-dom'

const OrderLayout = ({children}) => {
    const order_links = [
        { name: 'Order', path: '/order'},
        { name: 'Prepairing', path: '/order/prepairing'},
        { name: 'To Ship', path: '/order/to-ship'},
        { name: 'Completed', path: '/order/completed'},
        { name: 'Cancelled', path: '/order/cancelled'},
    ]

    return (
        <div className='relative bg-[#FED32C] h-fit min-h-[38vh] text-[#515151]'>
            <div className='pt-10 px-8'>
                <p className='text-[18px] font-bold tracking-wide'>Order</p>

                <ul className='flex gap-4 justify-center text-center text-sm mt-2 bg-white w-fit px-4 rounded'>
                    {order_links.map((item, index) => (
                        <Link key={index} to={item.path}>
                            <li className={` w-[115px] p-2.5 
                                ${location.pathname === item.path ? 'border-b-[3px] border-[#6C757D] w-[115px]' : ' hover:border-b-[3px] hover:border-[#6C757D] hover:w-[115px]'}
                            `}>
                                {item.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className='flex w-full px-10 mt-10 mb-4'>
            </div>
            {children}
        </div>
        // <div className='mt-[50px] mx-[50px]'>
        //     <HeadingMark title={'Order Status'} />
        //     <div className="flex border bg-gray-800">
        //         <LinkButton params={'/order'} actionName={'Order'} />
        //         <LinkButton params={'/order/prepairing'} actionName={'Prepairing'} />
        //         <LinkButton params={'/order/to-ship'} actionName={'To Ship'} />
        //         <LinkButton params={'/order/completed'} actionName={'Completed'} />
        //         <LinkButton params={'/order/cancelled'} actionName={'Cancelled'} />
        //     </div>
        //     {children}
        // </div>
    )
}

export default OrderLayout