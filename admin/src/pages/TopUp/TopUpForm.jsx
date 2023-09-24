import React, { useState } from 'react';
import api from '../../services/apiRequest';

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
        api.post('/api/user/top-up', credentials)
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })
            
    };

    return (
        <form onSubmit={handleTopUp}>
            <div className="form-group">
                <label htmlFor="amount">Amount:</label>
                <input
                    type="text"
                    id="amount"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="cardNumber">Card Number:</label>
                <input
                    type="text"
                    id="cardNumber"
                    className="form-control"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="expiryDate">Expiry Date:</label>
                <input
                    type="text"
                    id="expiryDate"
                    className="form-control"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="cvv">CVV:</label>
                <input
                    type="text"
                    id="cvv"
                    className="form-control"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Top-Up
            </button>
        </form>
    );
};

export default TopUpForm;
