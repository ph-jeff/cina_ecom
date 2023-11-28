// LoginLayout.js
import React from 'react';

function LoginLayout({ children }) {
    return (
        <div>
            <nav className='h-[10vh] bg-[#245289] flex items-center justify-between px-5'>
                {/* logo */}
                <h1>Logo</h1>
            </nav>
            <section className='bg-slate-200 h-[100vh]'>
                {children}
            </section>
        </div>
    );
}

export default LoginLayout;
