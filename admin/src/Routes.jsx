
import { Route, Routes } from "react-router-dom";

import Login from './pages/Login/Index'

import MainLayout from './components/MainLayout';
import LoginLayout from './components/LoginLayout';

import Dashboard from './pages/Dashboard/Main';
import Sales from './pages/Dashboard/Sales';

import Product from './pages/Product/ProductList/Index';
// create update product
import AddProduct from './pages/Product/ProductList/Create';
import UpdateProduct from './pages/Product/ProductList/Update';
// under product
import Category from "./pages/Product/Category/Category";
import Size from "./pages/Product/Size/Size";
import Brand from "./pages/Product/Brand/Brand";

import Order from './pages/Order/Pending/Index';
import Prepairing from './pages/Order/Prepairing/Index';
import ToShip from './pages/Order/ToShip/Index';
import Completed from './pages/Order/Completed/Index';

import User from './pages/User/Index';
import Report from './pages/Report/Index';
import SalesReport from './pages/Report/SalesReport/SalesReport';
import InventoryReport from './pages/Report/InventoryReport/InventoryReport';

const AppRoutes = () => {
    return(
        <Routes>
            {/* <Route path="/login" element={<LoginLayout> <Login />
                </LoginLayout>}
            /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MainLayout>
                <Dashboard />
            </MainLayout>} />
            <Route path="/sales" element={<MainLayout>
                <Sales />
            </MainLayout>} />

            <Route path="/product" element={<MainLayout>
                <Product />
            </MainLayout>} />

            <Route path="/product/category" element={<MainLayout>
                <Category />
            </MainLayout>} />

            <Route path="/product/size" element={<MainLayout>
                <Size />
            </MainLayout>} />

            <Route path="/product/brand" element={<MainLayout>
                <Brand />
            </MainLayout>} />

            <Route path="/product/create" element={<MainLayout>
                <AddProduct />
            </MainLayout>} />
            <Route path="/product/update/:id" element={<MainLayout>
                <UpdateProduct />
            </MainLayout>} />

            <Route path="/order" element={<MainLayout>
                <Order />
            </MainLayout>} />

            <Route path="/order/prepairing" element={<MainLayout>
                <Prepairing />
            </MainLayout>} />

            <Route path="/order/to-ship" element={<MainLayout>
                <ToShip />
            </MainLayout>} />

            <Route path="/order/completed" element={<MainLayout>
                <Completed />
            </MainLayout>} />

            <Route path="/users" element={<MainLayout>
                <User />
            </MainLayout>} />

            <Route path="/reports/inventory" element={<MainLayout>
                <InventoryReport />
            </MainLayout>} />

            <Route path="/reports/sales" element={<MainLayout>
                <SalesReport />
            </MainLayout>} />

            <Route path="/*" element={<h1>Not Found</h1>} />
        </Routes>
    )
}

export default AppRoutes;