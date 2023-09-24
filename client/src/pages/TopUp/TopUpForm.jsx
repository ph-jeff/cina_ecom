import React, { useState } from 'react';
import api from '../../services/apiRequest';
import DateTimePicker from 'react-datetime-picker';

const TopUpForm = () => {
    const [amount, setAmount] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleTopUp = async (e) => {
        e.preventDefault();

        // Create a top-up object with user input
        const credentials = {
            amount,
            cardNumber,
            expiryDate,
            cvv,
        };
        api.post('/api/user/account/top-up', credentials)
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })

    };

    return (
        <form onSubmit={handleTopUp} className="max-w-md mx-auto">
            <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
                    Amount
                </label>
                <input
                    type="text"
                    id="amount"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="cardNumber" className="block text-gray-700 font-bold mb-2">
                    Card Number
                </label>
                <input
                    type="number"
                    id="cardNumber"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="expiryDate" className="block text-gray-700 font-bold mb-2">
                    Expiry Date
                </label>
                {/* <DateTimePicker */}
                <input
                    type="datetime-local"
                    id="expiryDate"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="cvv" className="block text-gray-700 font-bold mb-2">
                    CVV
                </label>
                <input
                    type="text"
                    id="cvv"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
                Top-Up
            </button>
        </form>

    );
};

export default TopUpForm;
