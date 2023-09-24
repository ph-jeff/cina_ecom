import React, { useEffect, useState } from 'react';
import ActionButton from '../../components/ActionButton';

const Transaction = () => {

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className='font-medium text-2xl mb-4'>Transaction</h1>
                <div className="w-full md:pr-4 mb-4">
                    <div className="bg-white shadow-md p-4 rounded-md">
                        <div className="mb-4">
                            <table className="w-full table-auto border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 text-left">Transaction ID</th>
                                        <th className="px-4 py-2 text-left">Items</th>
                                        <th className="px-4 py-2 text-left">Date Ordered</th>
                                        <th className="px-4 py-2 text-left">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-4 py-2">1</td>
                                        <td className="px-4 py-2">1</td>
                                        <td className="px-4 py-2">1</td>
                                        <td className="px-4 py-2">
                                            cancel
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Transaction