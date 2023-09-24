import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../../services/apiRequest';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [lastname, setLastname] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");

    const [email, setEmail] = useState("");
    const [emailExisted, setEmailExisted] = useState(false);
    const [password, setPassword] = useState("");

    function emailChecker(e){
        setEmail(e.target.value)
        if(email){
            api.post('/api/user/auth/register/check-email', {
                email: e.target.value,
            })
            .then(response => {
                console.log(response);
                if(response.data){
                    setEmailExisted(true)
                }else{
                    setEmailExisted(false)
                }
            })
            .catch(err => {
                console.log(err.response)
            })
        }
    }

    async function handleSubmit(e){
        e.preventDefault();
        api.post('/api/user/auth/register', {
            firstname,
            middlename,
            lastname,
            contact,
            address,
            email,
            password
        })
        .then(response => {
            console.log(response.data)
            setFirstname("");
            setMiddlename("");
            setLastname("");
            setContact("");
            setAddress("");

            setEmail("");
            setPassword("");
            setEmailExisted(false)
            toast.success('You are now registered')
            navigate('/login')
        })
        .catch(err => {
            console.log(err)
            toast.error(err.response.data.error)
        })
    }

    return (
        <div>
            <div className="min-h-screen h-fit my-5 flex justify-center items-center">
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-row flex-wrap justify-center'>
                        <div className="bg-slate-200 h-auto w-full md:w-96 shadow rounded px-4 py-5 mx-3 mb-5">
                            <h1 className='font-medium'>Personal Information</h1>
                            <div>
                                <label htmlFor="firstname">Firstname</label>
                                <input value={firstname} onChange={e => setFirstname(e.target.value)} className='w-full px-3 py-1 rounded' type="text" id='firstname' placeholder='firstname' />
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="middlename">Middlename</label>
                                <input value={middlename} onChange={e => setMiddlename(e.target.value)} className='w-full px-3 py-1 rounded' type="text" id='middlename' placeholder='middlename' />
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="lastname">Lastname</label>
                                <input value={lastname} onChange={e => setLastname(e.target.value)} className='w-full px-3 py-1 rounded' type="text" id='lastname' placeholder='lastname' />
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="contact_number">Contact Number</label>
                                <input value={contact} onChange={e => setContact(e.target.value)} className='w-full px-3 py-1 rounded' type="text" id='contact_number' placeholder='contact number' />
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="address">Address</label>
                                <input value={address} onChange={e => setAddress(e.target.value)} className='w-full px-3 py-1 rounded' type="text" id='address' placeholder='address' />
                            </div>
                        </div>

                        <div className="bg-slate-200 h-fit w-full md:w-96 shadow rounded px-4 py-5 mx-3 mb-5">
                            <div className='mt-2'>
                                <label htmlFor="province">Province</label>
                                <select name="" id="province" className='w-full px-3 py-1 rounded'>
                                    <option className='w-full px-3 py-1 rounded' value="">Province</option>
                                    <option className='w-full px-3 py-1 rounded' value=""></option>
                                    <option className='w-full px-3 py-1 rounded' value=""></option>
                                </select>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="city">City</label>
                                <select name="" id="city" className='w-full px-3 py-1 rounded'>
                                    <option className='w-full px-3 py-1 rounded' value="">City</option>
                                    <option className='w-full px-3 py-1 rounded' value=""></option>
                                    <option className='w-full px-3 py-1 rounded' value=""></option>
                                </select>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="barangay">Barangay</label>
                                <select name="" id="barangay" className='w-full px-3 py-1 rounded'>
                                    <option className='w-full px-3 py-1 rounded' value="">Barangay</option>
                                    <option className='w-full px-3 py-1 rounded' value=""></option>
                                    <option className='w-full px-3 py-1 rounded' value=""></option>
                                </select>
                            </div>
                        </div>

                        <div className="bg-slate-200 h-fit w-full md:w-80 shadow rounded px-4 py-5 mx-3">
                            <div>
                                <label htmlFor="email">Email</label>
                                <input value={email} onChange={emailChecker} className='w-full px-3 py-1 rounded' type="text" id='email' placeholder='email' />
                            </div>
                            {emailExisted && (
                                <>
                                    <p className='text-red-800'>Already taken</p>
                                </>
                            )}
                            <div className='mt-2'>
                                <label htmlFor="password">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} className='w-full px-3 py-1 rounded' type="password" id='password' placeholder='password' />
                            </div>
                            <div className='mt-2'>
                                <span className='text-sm'>Already have an account?</span>
                                <Link className='text-sm text-blue-500' to="/login"> Login</Link>
                            </div>
                            <div className='flex justify-center'>
                                <button className='bg-gray-800 hover:bg-gray-700 text-slate-200 px-5 py-1 rounded mt-2 shadow-xl shadow-gray-500/50'>Register</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register