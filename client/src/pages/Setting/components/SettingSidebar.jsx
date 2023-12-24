import React from 'react'
import { Link } from 'react-router-dom'

const SettingSidebar = () => {
    return (
        // <div className='w-screen md:w-[20vw] min-w-[150px] h-full text-gray-800 flex justify-center'>
        //     <ul className='h-fit w-full'>
        //         <li><Link className='w-full bg-red-900 text-center' to={'/account'}>Profile Settings</Link></li>
        //         <li><Link className='w-full bg-red-900 text-center' to={'/transactions'}>Transaction</Link></li>
        //     </ul>
        // </div>

        <div className='w-screen md:w-[20vw] min-w-[150px] h-full text-slate-200 flex justify-center'>
            <ul className='h-fit w-[100%] p-4'>
                <li className='mb-5'>
                    <Link className='w-full bg-gray-800 text-center py-2 px-4 rounded-md hover:bg-gray-900 transition duration-300' to={'/account'}>
                        Profile Settings
                    </Link>
                </li>
                <li>
                    <Link className='w-full bg-gray-800 text-center py-2 px-4 rounded-md hover:bg-gray-900 transition duration-300' to={'/transactions'}>
                        Transaction
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SettingSidebar