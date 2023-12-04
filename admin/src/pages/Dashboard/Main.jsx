import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../services/apiRequest';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Main = () => {
    const [totalSales, setTotalSales] = useState(0);
    const [monthlySales, setMonthlySales] = useState(0);
    const [month_over_month, setOverMonth] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [pendingOrders, setPendingOrders] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        api.get('/api/admin/dashboard')
            .then(response => {
                console.log(response)
                setTotalSales(response.data.total_sales);
                setMonthlySales(response.data.monthly_sales)
                setOverMonth(response.data.month_over_month)
                setTotalOrders(response.data.total_order);
                setPendingOrders(response.data.pending_order);
                setTotalCustomers(response.data.total_customers);
                // setTopProducts(topProducts);
            })
            .catch(error => {
                console.log(error)
            })

    }, []);

    const salesData = [
        { month: 'Jan', sales: 2 },
        { month: 'Feb', sales: 5.5 },
        { month: 'Mar', sales: 2 },
        { month: 'Apr', sales: 8.5 },
        { month: 'May', sales: 1.5 },
        { month: 'Jun', sales: 234 },
        { month: 'Jul', sales: 5 },
        { month: 'Aug', sales: 2342 },
        { month: 'Sep', sales: 5 },
        { month: 'Oct', sales: 45 },
        { month: 'Nov', sales: 5 },
        { month: 'Dec', sales: 345 },
    ];

    return (
        <div className="min-h-screen h-fit bg-gray-100 bg-[#C4A353] p-8">
            <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {/* Total Sales */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Sales</h2>
                    <p className="text-3xl font-bold text-green-500">
                        {totalSales.toLocaleString("en-PH", {
                            style: "currency",
                            currency: "PHP",
                        })}
                    </p>
                </div>

                {/* Monthly Sales */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Monthly Sales</h2>
                    <p className="text-3xl font-bold text-green-500">
                        {monthlySales.toLocaleString("en-PH", {
                            style: "currency",
                            currency: "PHP",
                        })}
                    </p>
                    <span className={`${month_over_month > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {month_over_month}
                    </span>
                </div>

                {/* Total Orders */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
                    <p className="text-3xl font-bold text-blue-500">{totalOrders}</p>
                </div>

                {/* Total Orders */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Pending Orders</h2>
                    <p className="text-3xl font-bold text-red-500">{pendingOrders}</p>
                </div>

                {/* Total Customers */}
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Customers</h2>
                    <p className="text-3xl font-bold text-purple-500">{totalCustomers}</p>
                </div>

            </div>

            <div className="container border shadow px-2 py-1 mt-5">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Main;
