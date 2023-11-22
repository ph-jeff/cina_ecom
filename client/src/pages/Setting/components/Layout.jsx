import React from 'react'
import SettingSidebar from './SettingSidebar'

const Layout = ({ children }) => {
    return (
        // <div className='h-fit md:h-screen w-full md:flex flex-row'>
        //     <SettingSidebar />
        //     <div className='md:w-[80vw] sm:w-screen bg-[#C4A353] h-fit min-h-screen'>
        //         {children}
        //     </div>
        // </div>
        // <div className='h-fit md:h-screen w-full md:flex flex-row'>
        //     <SettingSidebar />
        //     <div className='md:w-[80vw] sm:w-screen bg-[#C4A353] h-fit min-h-screen'>
        //         {children}
        //     </div>
        // </div>
        <div className='h-full md:h-screen w-full md:flex flex-row overflow-hidden'>
            <SettingSidebar />
            <div className='flex-1 bg-[#C4A353] h-full overflow-y-auto overflow-x-hidden'>
                {children}
            </div>
        </div>
    )
}

export default Layout