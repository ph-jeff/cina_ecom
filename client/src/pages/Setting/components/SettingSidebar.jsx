import React from 'react'
import { Link } from 'react-router-dom'

const SettingSidebar = () => {
    return (
        <div className='w-screen md:w-[20vw] min-w-[150px] h-full text-gray-800 border border-gray-300 flex justify-center'>
            <ul className='h-fit w-full'>
                <li><Link to={'/account'}>Profile Settings</Link></li>
                <li><Link to={'/transactions'}>Transaction</Link></li>
            </ul>
        </div>
    )
}

export default SettingSidebar