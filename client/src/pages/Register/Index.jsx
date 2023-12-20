import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import api from '../../services/apiRequest';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import provincesData from '../../utils/provinceData.json';

const Register = () => {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [lastname, setLastname] = useState("");
    const [contact, setContact] = useState("");

    const [house_number, setHouseNumber] = useState("");
    const [zip_code, setZipCode] = useState("");

    const [province, setProvince] = useState("");
    const [municipal, setMunicipal] = useState("");
    const [barangay, setBarangay] = useState("");

    const [email, setEmail] = useState("");
    const [emailExisted, setEmailExisted] = useState(false);
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");

    function emailChecker(e) {
        setEmail(e.target.value)
        if (email) {
            api.post('/api/user/auth/register/check-email', {
                email: e.target.value,
            })
                .then(response => {
                    console.log(response);
                    if (response.data) {
                        setEmailExisted(true)
                    } else {
                        setEmailExisted(false)
                    }
                })
                .catch(err => {
                    console.log(err.response)
                })
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        api.post('/api/user/auth/register', {
            firstname,
            middlename,
            lastname,
            contact,
            house_number,
            zip_code,
            province,
            municipal,
            barangay,
            email,
            password,
            confirm_password,
        })
            .then(response => {
                console.log(response.data)
                setFirstname("");
                setMiddlename("");
                setLastname("");
                setContact("");

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

    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedMunicipality, setSelectedMunicipality] = useState('');
    const [selectedBarangay, setSelectedBarangay] = useState('');

    const [municipals, setMunicipals] = useState({});
    const [barangays, setBarangays] = useState({});

    const handleProvinceChange = (event) => {
        const selectedProvince = event.target.value;
        setProvince(selectedProvince)
        setSelectedProvince(selectedProvince);
        // reset city and barangay
        setSelectedMunicipality('');
        setSelectedBarangay('');

        const province = provincesData.provinces.find(province => province.name === selectedProvince);
        setMunicipals(province)
    };

    const handleMunicipalChange = (event) => {
        const selectedMunicipality = event.target.value;
        setMunicipal(selectedMunicipality)
        setSelectedMunicipality(selectedMunicipality);
        // reset barangay
        setSelectedBarangay('');

        const municipal = municipals.municipalities.find(municipal => municipal.name === selectedMunicipality);
        setBarangays(municipal)
    };

    const handleBarangayChange = (event) => {
        const selectedBarangay = event.target.value;
        setBarangay(selectedBarangay)
        setSelectedBarangay(selectedBarangay);
    };

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
                        </div>

                        <div className="bg-slate-200 h-fit w-full md:w-96 shadow rounded px-4 py-5 mx-3 mb-5">
                            <div className='mt-2'>
                                <label htmlFor="house_number">House Number</label>
                                <input value={house_number} onChange={(e) => setHouseNumber(e.target.value)} className='w-full px-3 py-1 rounded' type="text" id='house_number' placeholder='House Number' />
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="zip_code">Zip Code</label>
                                <input value={zip_code} onChange={(e) => setZipCode(e.target.value)} className='w-full px-3 py-1 rounded' type="text" id='zip_code' placeholder='Zip Code' />
                            </div>

                            <div className='mt-2'>
                                <label htmlFor="province">Province</label>
                                <select className='w-full px-3 py-1 rounded' onChange={handleProvinceChange} value={selectedProvince}>
                                    <option value="">Select Province</option>
                                    {provincesData.provinces.map((province, index) => (
                                        <option key={index} value={province.name}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='mt-2'>
                                <label htmlFor="province">Municipal</label>
                                <select className='w-full px-3 py-1 rounded' onChange={handleMunicipalChange} value={selectedMunicipality}>
                                    <option value="">Select Municipal</option>
                                    {selectedProvince && municipals.municipalities.map((city, index) => (
                                        <option key={index} value={city.name}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='mt-2'>
                                <label htmlFor="province">Barangay</label>
                                <select className='w-full px-3 py-1 rounded' onChange={handleBarangayChange} value={selectedBarangay}>
                                    <option value="">Select Barangay</option>
                                    {selectedMunicipality && barangays.barangays.map((barangay, index) => (
                                        <option key={index} value={barangay}>
                                            {barangay}
                                        </option>
                                    ))}
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
                                <label htmlFor="confirm_password">Confirm Password</label>
                                <input value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} className='w-full px-3 py-1 rounded' type="password" id='confirm_password' placeholder='confirm password' />
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