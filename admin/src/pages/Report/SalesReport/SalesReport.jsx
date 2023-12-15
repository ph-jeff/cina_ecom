import React, { useState } from 'react'
import ReportLayout from '../components/ReportLayout';
import Range from '../../../components/Range';

const SalesReport = () => {
    const [query, setQuery] = useState("");
    const [limit, setLimit] = useState(5);
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <ReportLayout>
            <div className="mt-10 bg-white w-full p-4 shadow-md rounded-lg border border-slate-200">
                <div className="flex justify-between mb-4">
                    <Range setLimit={setLimit} />
                    <input className="px-4 py-2 rounded border" value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Search" />
                </div>
                <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className='text-left'>1</th>
                            <th className='text-left'>1</th>
                            <th className='text-left'>1</th>
                            <th className='text-left'>1</th>
                            <th className='text-left'>1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                        </tr>
                        <tr>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                        </tr>
                        <tr>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                        </tr>
                        <tr>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                        </tr>
                        <tr>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                            <td className='text-left'>1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ReportLayout>
    )
}

export default SalesReport