import React from 'react'
import LinkButton from '../../../components/LinkButton'
import HeadingMark from '../../../components/HeadingMark'

const OrderLayout = ({children}) => {
    return (
        <div className='mt-[50px] mx-[50px]'>
            <HeadingMark title={'Order Status'} />
            <div className="flex border bg-gray-800">
                <LinkButton params={'/order'} actionName={'Order'} />
                <LinkButton params={'/order/prepairing'} actionName={'Prepairing'} />
                <LinkButton params={'/order/to-ship'} actionName={'To Ship'} />
                <LinkButton params={'/order/completed'} actionName={'Completed'} />
            </div>
            {children}
        </div>
    )
}

export default OrderLayout