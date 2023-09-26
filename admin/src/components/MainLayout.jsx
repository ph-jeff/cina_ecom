// DefaultLayout.js
import React from 'react';
import Sidebar from './Sidebar';
import { Navigate } from 'react-router-dom';

function MainLayout({ children }) {
    const user = localStorage.getItem('user');
    if(!user){
        return <Navigate to={'/login'} />
    }
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="basis-[80%] h-[100vh] overflow-x-hidden">
                    {/* <div className='flex items-center gap-[15px] relative bg-gray-700'>
                        <div className='h-[50px] flex items-center'>
                            nav bar
                        </div>
                    </div> */}
                    { children }
                </div>
            </div>
        </>
    );
}

export default MainLayout;
