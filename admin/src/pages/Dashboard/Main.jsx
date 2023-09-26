import React from 'react';

const data = [
    { month: 'January', accounts: 100, profit: 5000 },
    { month: 'February', accounts: 120, profit: 6000 },
    // ... More months
];

const Main = () => {
    const totalAccounts = data.reduce((acc, month) => acc + month.accounts, 0);
    const totalProfit = data.reduce((acc, month) => acc + month.profit, 0);

    return (
        <div className="h-screen bg-gray-100">
            <div className="container mx-auto p-8">
                <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
                <div className="mb-8">
                    <p className="text-lg">
                        Total Number of Accounts: <span className="font-semibold">{totalAccounts}</span>
                    </p>
                    <p className="text-lg">
                        Total Profit: <span className="font-semibold">${totalProfit}</span>
                    </p>
                </div>
                <h2 className="text-2xl font-semibold mb-4">Monthly Stats</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.map((monthData, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md p-4"
                        >
                            <h3 className="text-lg font-semibold">{monthData.month}</h3>
                            <p className="text-gray-600">Accounts: {monthData.accounts}</p>
                            <p className="text-gray-600">Profit: ${monthData.profit}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Main;
