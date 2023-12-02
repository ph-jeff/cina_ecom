import React from 'react'
import ReportLayout from '../components/ReportLayout'
import BorderColorIcon from '@mui/icons-material/BorderColor';

const InventoryReport = () => {
    return (
        <ReportLayout>
            <div className="mt-10 bg-white w-full p-4 shadow-md rounded-lg border border-slate-200">
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className='text-left'>Category</th>
                            <th className='text-left'>Product Name</th>
                            <th className='text-left'>Current Stock</th>
                            <th className='text-left'>Quantity</th>
                            <th className='text-left'>Total Quantity</th>
                            <th className='text-left'>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                            <td className='text-left'>
                                <BorderColorIcon />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ReportLayout>
    )
}

export default InventoryReport