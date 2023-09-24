import React from 'react'
import { Link } from 'react-router-dom'
import api from '../services/apiRequest'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const navigate = useNavigate();
    function logout(e) {
        e.preventDefault()
        api.post('/api/admin/auth/logout')
            .then(response => {
                console.log(response)
                localStorage.removeItem('user')
                navigate('/login')
            })
    }
    return (
        <div className="basis-[15%] h-[100vh]">
            <div className='bg-gray-600 h-screen px-[25px]'>
                <div className='px-[15px] py-[30px] flex items-center justify-center font-medium border-b-[1px] border-slate-200/[0.5]'>
                    <h1 className='text-slate-200'>Admin Panel</h1>
                </div>

                <div className='text-slate-200 pt-[15px] border-b-[1px] border-slate-200/[0.5] font-medium'>
                    <p className='text-[11px] leading-[16px]'>Dashboard</p>
                    <Link to="/">
                        <div className='flex items-center gap-[15px] py-[10px]'>
                            <p className='text-slate-200 text-[14px] leading-[20px] font-bold'>Home</p>
                        </div>
                    </Link>
                    {/* <Link to="/sales">
                        <div className='flex items-center gap-[15px] py-[10px]'>
                            <p className='text-slate-200 text-[14px] leading-[20px] font-bold'>Sales</p>
                        </div>
                    </Link> */}
                </div>

                <div className='text-slate-200 pt-[15px] border-b-[1px] border-slate-200/[0.5] font-medium'>
                    <p className='text-[11px] leading-[16px]'>Quick Menu</p>
                    <Link to="/users">
                        <div className='flex items-center gap-[15px] py-[10px] border-slate-200/[0.3]'>
                            <p className='text-slate-200 text-[14px] leading-[20px] font-bold'>User</p>
                        </div>
                    </Link>

                    <Link to="/product">
                        <div className='flex items-center gap-[15px] py-[10px] border-slate-200/[0.3]'>
                            <p className='text-slate-200 text-[14px] leading-[20px] font-bold'>Product</p>
                        </div>
                    </Link>

                    <Link to="/order">
                        <div className='flex items-center gap-[15px] py-[10px] border-slate-200/[0.3]'>
                            <p className='text-slate-200 text-[14px] leading-[20px] font-bold'>Order</p>
                        </div>
                    </Link>

                    <Link to="/reports">
                        <div className='flex items-center gap-[15px] py-[10px] border-slate-200/[0.3]'>
                            <p className='text-slate-200 text-[14px] leading-[20px] font-bold'>Report</p>
                        </div>
                    </Link>
                </div>

                <div className='h-[100px] flex justify-center items-center'>
                    <form className='flex justify-center' onSubmit={logout}>
                        <button className='text-slate-200 text-[14px] font-bold'>Logout</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Sidebar