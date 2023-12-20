import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import Loading from '../../components/Loading';

import { useLogin } from '../../hooks/useLogin';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, isLoading } = useLogin();
    async function handleSubmit(e) {
        e.preventDefault();
        login(email, password)
    }

    return (
        <div>
            {isLoading && <Loading />}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} className='w-full px-3 py-1 rounded' type="text" id='email' placeholder='email' />
                </div>
                <div className='mt-2'>
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} className='w-full px-3 py-1 rounded' type="password" id='password' placeholder='password' />
                </div>
                <div className='mt-2'>
                    <span className='text-sm'>No account yet?</span>
                    <Link className='text-sm text-blue-500' to="/register"> Sign up!</Link>
                </div>
                <div className='flex justify-center'>
                    <button className='bg-gray-800 hover:bg-gray-700 text-slate-200 px-5 py-1 rounded mt-2 shadow-xl shadow-gray-500/50'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login