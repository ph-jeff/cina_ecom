import React, { useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom';
import api from '../../services/apiRequest';
import { toast } from 'react-hot-toast';

const Index = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault()
        api.post('/api/admin/auth/login', {
            email, password
        })
            .then((response) => {
                console.log(response.data)
                localStorage.setItem('user', response.data.user.email)
                navigate("/");
                toast.success('Logged in')
            })
            .catch((err) => {
                console.log(err.response.data)
                toast.error(err.response.data.error)
            })
    }

    return (
        <div className='h-full flex justify-center items-center mx-3'>
            <form onSubmit={handleSubmit} className='bg-cyan-200 w-[400px] h-fit px-7'>
                <h1 className='text-center font-medium text-2xl my-8'>Sign In</h1>
                <div className='mb-5'>
                    <input className='w-full px-5 py-2 rounded' value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder='email' />
                </div>
                <div>
                    <input className='w-full px-5 py-2 rounded' value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='password' />
                </div>
                <div>
                    <button className='w-full mt-5 bg-cyan-600 text-white py-2 rounded'>Login</button>
                </div>
                <div className='flex justify-center my-5'>
                    <Link to={""}>Forgot Password?</Link>
                </div>
            </form>
        </div>
    )
}

export default Index