import React from 'react'
import { Link } from 'react-router-dom'
import api from '../services/apiRequest'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
// import Home from '@mui/icons-material/Home';
import Home from '@mui/icons-material/HomeOutlined';
import Product from '@mui/icons-material/Inventory2Outlined';
import Management from '@mui/icons-material/FeedOutlined';
import Report from '@mui/icons-material/ImportContacts';
// import Account from '@mui/icons-material/Person';
import Account from '@mui/icons-material/PermIdentityOutlined';
// import Logout from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/SettingsOutlined';


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

    const styles = {
        home_icon: { fontSize: 20 },
    };

    return (
        <div className='h-[100vh] w-[20%] text-[#F2F2F2] text-sm bg-[#222222]'>
            <div className='my-14 flex justify-center'>
                <img src={logo} alt="Logo" className="w-[130px] h-[130px]" />
            </div>

            <ul className='mx-5 mb-6'>
                <div className='my-3 '>
                    <p className='text-xs'>Dashboard</p>
                    <div className='mt-1'>  
                        <Link to="/">
                            <li className='flex gap-3 items-center rounded-md pl-5 p-2 hover:text-[#515151] hover:bg-[#FED428] mb-1'>
                                <p><Home style={styles.home_icon}/></p>
                                <p className='text-[14px] leading-[20px]'>Home</p>
                            </li>
                        </Link>
                    </div>
                </div>
                <hr className='border-[#2D2D2D]' />

                <div className='my-3 '>
                    <p className='text-xs'>Quick Menu</p>
                    <div className='mt-1'>
                        <Link to="/product">
                            <li className='flex gap-3 items-center rounded-md pl-5 p-2 hover:text-[#515151] hover:bg-[#FED32C] mb-1'>
                                <p><Product style={styles.home_icon}/></p>
                                <p className='text-[14px] leading-[20px]'>Product Management</p>
                            </li>
                        </Link>
                    </div>
                    <div className='mt-1'>
                        <Link to="/order">
                            <li className='flex gap-3 items-center rounded-md pl-5 p-2 hover:text-[#515151] hover:bg-[#FED32C] mb-1'>
                                <p><Management style={styles.home_icon}/></p>
                                <p className='text-[14px] leading-[20px]'>Order Management</p>
                            </li>
                        </Link>
                    </div>
                    <div className='mt-1'>
                        <Link to="/reports/sales">
                            <li className='flex gap-3 items-center rounded-md pl-5 p-2 hover:text-[#515151] hover:bg-[#FED32C] mb-1'>
                                <p><Report style={styles.home_icon}/></p>
                                <p className='text-[14px] leading-[20px]'>Reports</p>
                            </li>
                        </Link>
                    </div>
                    <div className='mt-1'>
                        <Link to="/users">
                            <li className='flex gap-3 items-center rounded-md pl-5 p-2 hover:text-[#515151] hover:bg-[#FED32C] mb-1'>
                                <p><Account style={styles.home_icon}/></p>
                                <p className='text-[14px] leading-[20px]'>Accounts</p>
                            </li>
                        </Link>
                    </div>
                </div>
                <hr className='border-[#2D2D2D]' />

                <div className='border-slate-200/[0.5] mt-2'>
                    <form className='flex gap-3 items-center rounded-md pl-5 p-2 hover:text-[#515151] hover:bg-[#FED32C] mb-1' onSubmit={logout}>
                        <p><Logout style={styles.home_icon}/></p>
                        <button className='text-[14px] leading-[20px]'>Logout</button>
                    </form>
                </div>
            </ul>
            
            {/* <div className='bg-black h-screen px-[25px]'>
                <div className='px-[15px] py-[30px] flex items-center justify-center font-medium border-b-[1px] border-slate-200/[0.5]'>
                    <img src={logo} alt="Logo" className="w-[150px] h-[150px] mr-[10px]" />
                </div>

                <div className='text-slate-200 pt-[15px] border-b-[1px] border-slate-200/[0.5] font-medium'>
                    <p className='text-[11px] leading-[16px]'>Dashboard</p>
                    <Link to="/">
                        <div className='flex items-center gap-[15px] py-[10px]'>
                            <p className='text-slate-200 text-[14px] leading-[20px] font-bold'>Home</p>
                        </div>
                    </Link>
                </div>

                <div className='text-slate-200 pt-[15px] border-b-[1px] border-slate-200/[0.5] font-medium'>
                    <p className='text-[11px] leading-[16px]'>Quick Menu</p>
                    <Link to="/product">
                        <div className='flex items-center gap-[15px] py-[10px] border-slate-200/[0.3]'>
                            <p className='text-slate-200 text-[14px] leading-[20px] font-bold'>Product Management</p>
                        </div>
                    </Link>

                    <Link to="/order">
                        <div className='flex items-center gap-[15px] py-[10px] border-slate-200/[0.3]'>
                            <p className='text-slate-200 text-[14px] leading-[20px] font-bold'>Order Management</p>
                        </div>
                    </Link>

                    <Link to="/reports/sales">
                        <div className='flex items-center gap-[15px] py-[10px] border-slate-200/[0.3]'>
                            <p className='text-slate-200 text-[14px] leading-[20px] font-bold'>Reports</p>
                        </div>
                    </Link>
                    <Link to="/users">
                        <div className='flex items-center gap-[15px] py-[10px] border-slate-200/[0.3]'>
                            <p className='text-slate-200 text-[14px] leading-[20px] font-bold'>Accounts</p>
                        </div>
                    </Link>
                </div>

                <div className='text-slate-200 border-slate-200/[0.5] font-medium'>
                    <form className='flex items-center gap-[15px] py-[10px] border-slate-200/[0.3]' onSubmit={logout}>
                        <button className='text-slate-200 text-[14px] font-bold'>Logout</button>
                    </form>
                </div>
            </div> */}
        </div>
    )
}

export default Sidebar