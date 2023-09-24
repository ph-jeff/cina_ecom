import React from 'react'
import SettingSidebar from './SettingSidebar'

const Layout = ({children}) => {
  return (
    // <div className='h-fit md:h-screen w-full md:flex flex-row'>
    <div className='h-fit md:h-screen w-full md:flex flex-row'>
        <SettingSidebar />
        <div className='md:w-[80vw] sm:w-screen bg-slate-100 h-fit min-h-screen'>
            {children}
        </div>
    </div>
  )
}

export default Layout