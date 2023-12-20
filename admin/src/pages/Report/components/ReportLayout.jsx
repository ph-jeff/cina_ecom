import React from 'react'
// import LinkButton from '../../../components/LinkButton'
import { Link, useLocation } from 'react-router-dom'

import HeadingMark from '../../../components/HeadingMark'

const ReportLayout = ({children}) => {
    const location = useLocation();

    const report_layout = [
        { name: 'Sales', path: '/reports/sales'},
        { name: 'Inventory', path: '/reports/inventory'},
    ]

    return (

    <div className='relative bg-[#FED32C] h-fit min-h-[38vh] text-[#515151]'>
        <div className='pt-10 px-8'>
            <p className='text-[18px] font-bold tracking-wide'>Report</p>

            <ul className='flex gap-4 justify-center text-center text-sm mt-2 bg-white w-fit px-4 rounded'>
                {report_layout.map((item, index) => (
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
  )
}

export default ReportLayout