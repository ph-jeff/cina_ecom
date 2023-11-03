import React from 'react'
import { Link } from 'react-router-dom'

const SettingSidebar = () => {
    return (
        <div className='w-screen md:w-[20vw] min-w-[150px] h-full text-gray-800 flex justify-center'>
            <ul className='h-fit w-full'>
                <li><Link className='w-full bg-red-900 text-center' to={'/account'}>Profile Settings</Link></li>
                <li><Link className='w-full bg-red-900 text-center' to={'/transactions'}>Transaction</Link></li>
            </ul>
        </div>
    )
}

export default SettingSidebar