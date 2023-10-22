import { Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

import Homepage from './pages/Home/Index';
import CartPage from './pages/Cart/Index'

import SettingPage from './pages/Setting/Index';
import Transaction from './pages/Setting/Transaction';

import AuthLayout from './components/AuthLayout';
import Login from './pages/Login/Index';
import Register from './pages/Register/Index';

import ProductDetails from './pages/ProductDetails/Index';
import TryItOn from './pages/TryItOn/Index';
import SearchItem from './pages/SearchItem/Index';
import NotFound from './pages/NotFound/Index';
import TopUpForm from "./pages/TopUp/TopUpForm";
import SettingLayout from './pages/Setting/components/Layout';
import CheckOut from "./pages/CheckOut/Index"
import Success from './pages/Transaction/Success';
import Cancelled from './pages/Transaction/Cancelled';

import Category from './pages/Category/Index'
import Brand from './pages/Brand/Index';
import SelectedBrand from './pages/Brand/SelectedBrand';
import Sale from './pages/Sale/Index'

const AppRoutes = () => {
    const {user} = useAuthContext();

    return(
        <Routes>

            <Route path='/login' element={user ? <Navigate to={'/'} /> : <AuthLayout>
                <Login/>
            </AuthLayout>}/>
            <Route path='/register' element={user ? <Navigate to={'/'} /> : <Register/>}/>

            <Route path='/' element={<Homepage/>}/>
            <Route path='/cart' element={user ? <CartPage/> : <Navigate to={'/login'}/>}/>

            <Route path='/account' element={user ? <SettingLayout>
                <SettingPage />
            </SettingLayout> : <Navigate to={'/login'}/>}/>
            <Route path='/transactions' element={user ? <SettingLayout>
                <Transaction />
            </SettingLayout> : <Navigate to={'/login'}/>}/>

            <Route path='/product/details/:id' element={<ProductDetails/>}/>
            <Route path='/product/try-it-on/:id' element={<TryItOn/>}/>
            <Route path='/check-out/:id' element={user ? <CheckOut/> : <Navigate to={'/login'}/>}/>

            <Route path='/transaction/success/:link' element={user ? <Success/> : <Navigate to={'/login'}/>}/>
            <Route path='/transaction/cancelled/:link' element={user ? <Cancelled/> : <Navigate to={'/login'}/>}/>

            <Route path='/product/search/' element={<SearchItem />}/>
            <Route path='/account/top-up' element={user ? <TopUpForm /> : <Navigate to={'/login'}/>}/>

            <Route path='/category' element={<Category />}/>
            <Route path='/brand' element={<Brand />}/>
            <Route path='/brand/:brand' element={<SelectedBrand />}/>
            <Route path='/sale' element={<Sale />}/>

            <Route path='*' element={<NotFound />}/>

        </Routes>
    )
}

export default AppRoutes;