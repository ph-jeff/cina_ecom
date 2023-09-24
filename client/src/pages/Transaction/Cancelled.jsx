import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/apiRequest';

const Cancelled = () => {
    const { link } = useParams();
    const [transaction, setTransaction] = useState();
    const [message, setMessage] = useState("");

    function fetchTransaction(){
        api.get(`/api/user/transaction/cancelled/${link}`)
        .then((response) => {
            console.log(response)
            setTransaction(response.data)
        })
        .catch((err) => {
            console.log(err.response.data.error)
            setMessage(err.response.data.error)
        })
    }

    useEffect(() => {
        fetchTransaction();
    }, [])
  return (
    <>
        {transaction ? (
            <div className='h-screen flex justify-center items-center'>
                Your transaction has been cancelled
            </div>
        ) : (
            <div className='h-screen flex justify-center items-center'>
                {message}
            </div>
        )}
        
    </>
  )
}

export default Cancelled