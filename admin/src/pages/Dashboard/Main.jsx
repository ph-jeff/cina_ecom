// import React from 'react';

// const data = [
//     { month: 'January', accounts: 100, profit: 5000 },
//     { month: 'February', accounts: 120, profit: 6000 },
// ];

// const Main = () => {
//     const totalAccounts = data.reduce((acc, month) => acc + month.accounts, 0);
//     const totalProfit = data.reduce((acc, month) => acc + month.profit, 0);

//     return (
//         <div className="h-screen bg-gray-100 bg-[#C4A353] p-8">
//             <div className="container mx-auto">
//                 <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
//                 <div className="mb-8">
//                     <p className="text-lg">
//                         Total Number of Accounts: <span className="font-semibold">{totalAccounts}</span>
//                     </p>
//                     <p className="text-lg">
//                         Total Profit: <span className="font-semibold">${totalProfit}</span>
//                     </p>
//                 </div>
//                 <h2 className="text-2xl font-semibold mb-4">Monthly Stats</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                     {data.map((monthData, index) => (
//                         <div
//                             key={index}
//                             className="bg-white rounded-lg shadow-md p-4"
//                         >
//                             <h3 className="text-lg font-semibold">{monthData.month}</h3>
//                             <p className="text-gray-600">Accounts: {monthData.accounts}</p>
//                             <p className="text-gray-600">Profit: ${monthData.profit}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Main;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../../services/apiRequest';

const Main = () => {
    const [totalSales, setTotalSales] = useState(0);
    const [monthlySales, setMonthlySales] = useState(0);
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
            setTotalOrders(response.data.total_order);
            setPendingOrders(response.data.pending_order);
            setTotalCustomers(response.data.total_customers);
            // setTopProducts(topProducts);
        })
        .catch(error => {
            console.log(error)
        })

    }, []);

    return (
        <div className="h-screen bg-gray-100 bg-[#C4A353] p-8">
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

            <div className="container bg-red-900 mt-5">
                a
            </div>
        </div>
    );
};

export default Main;
