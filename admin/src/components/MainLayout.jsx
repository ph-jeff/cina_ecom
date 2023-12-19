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
                <div className="basis-[80%] h-[100vh] overflow-x-hidden bg-[#1A1A1A]">
                    { children }
                </div>
            </div>
        </>
    );
}

export default MainLayout;
