import React from 'react'

const AuthLayout = ({ children }) => {
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-slate-200 h-auto w-80 shadow rounded px-4 py-5">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout