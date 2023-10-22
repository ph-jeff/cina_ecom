import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/apiRequest';
import Loading from '../../components/Loading';

const Success = () => {
    const { link } = useParams();
    const [transaction, setTransaction] = useState();
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        function fetchTransaction() {
            api.get(`/api/user/transaction/success/${link}`)
                .then((response) => {
                    console.log(response.data)
                    setTransaction(response.data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err.response.data)
                    setLoading(false)
                })
        }
        fetchTransaction();

    }, [])
    return (
        <>
            {isLoading && <Loading />}
            {transaction ? (
                <div className='h-screen flex flex-col justify-center items-center px-4 py-5'>
                    <h3 className="text-xl font-medium text-gray-800 mb-4">
                        Your purchase is successful!
                    </h3>

                    {transaction.items.map((product) => (
                        <div className="w-full max-w-screen-md bg-white rounded-lg border border-slate-300 overflow-hidden mb-4" key={product._id}>
                            <div className="flex flex-col md:flex-row">
                                <div className="w-full md:w-1/2 p-4">
                                    <h2 className="text-3xl font-medium text-gray-800 mb-4">
                                        {product.product_id.name}
                                    </h2>
                                    <p className="text-lg text-gray-600 mb-4">{product.product_id.description}</p>
                                    {/* <p className="text-xl text-gray-800 mb-4">
                                        {parseInt(product.product_id.price).toLocaleString("en-PH", {
                                            style: "currency",
                                            currency: "PHP",
                                        })}
                                    </p>
                                    <div>
                                        <p className="text-gray-800">Quantity: {product.quantity}</p>
                                    </div> */}
                                </div>
                                <div className="w-full md:w-1/2 p-4">
                                    <div className="bg-gray-200 rounded-lg p-4">
                                        <div className="flex justify-between mb-2">
                                            <span>Item Price:</span>
                                            <span>
                                                {parseInt(product.product_id.price).toLocaleString("en-PH", {
                                                    style: "currency",
                                                    currency: "PHP",
                                                })}
                                            </span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span>Quantity:</span>
                                            <span>{product.quantity}</span>
                                        </div>
                                        <div className="flex justify-between mb-2">
                                            <span>Total:</span>
                                            <span>
                                                {(
                                                    parseInt(product.product_id.price) * product.quantity
                                                ).toLocaleString("en-PH", {
                                                    style: "currency",
                                                    currency: "PHP",
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='h-screen flex justify-center items-center'>
                    The link you are trying to access is expired
                </div>
            )}
        </>
    )
}

export default Success