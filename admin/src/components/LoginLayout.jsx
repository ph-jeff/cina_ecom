// LoginLayout.js
import React from 'react';

function LoginLayout({ children }) {
    return (
        <div>
            <nav className='h-[10vh] bg-[#245289] flex items-center justify-between px-5'>
                {/* logo */}
                <h1>Logo</h1>
                <ul className='flex'>
                    {/* <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About</Link></li> */}
                    {/* <li><Link to="/login">Login</Link></li> */}
                </ul>
            </nav>
            <section className='bg-slate-200 h-[100vh]'>
                {children}
            </section>
        </div>
    );
}

export default LoginLayout;
