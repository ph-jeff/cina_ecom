import React from 'react'

const DateRange = ({dateFrom, setDateFrom, dateTo, setDateTo}) => {
  return (
    <div className='flex justify-between mb-10'>
        <div className='flex gap-3 mt-4'>
            <div className='w-44'>
                <p className='w-full mb-1'>Date From</p>
                <input value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className='py-2 px-4 w-full rounded-md border border-gray-300 text-sm text-[#4f4f4f]' type="date" />
            </div>
            <div className='w-44'>
                <p className='w-full mb-1'>Date To</p>
                <input disabled={!dateFrom ? true : false} min={!dateFrom ? "" : dateFrom} value={dateTo} onChange={(e) => setDateTo(e.target.value)} className='py-2 px-4 w-full rounded-md border border-gray-300 text-sm text-[#4f4f4f]' type="date" />
            </div>
            <div className='w-44'>
                <button onClick={() => {
                    setDateFrom("")
                    setDateTo("")
                }} className='mt-6 py-2 px-4 w-fit rounded-md border border-gray-300 text-sm text-[#4f4f4f]'>clear</button>
            </div>
        </div>
    </div>
  )
}

export default DateRange