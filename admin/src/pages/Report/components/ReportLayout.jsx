import React from 'react'
import LinkButton from '../../../components/LinkButton'

const ReportLayout = ({children}) => {
  return (
    <div className='mt-[50px] mx-[50px]'>
        {/* <HeadingMark title={'Report'} /> */}
        <div className="flex border bg-gray-800">
            <LinkButton params={'/reports/sales'} actionName={'Sales'} />
            <LinkButton params={'/reports/inventory'} actionName={'Inventory'} />
        </div>
        {children}
    </div>
  )
}

export default ReportLayout