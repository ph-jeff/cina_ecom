import React from 'react'

const DateRange = () => {
  return (
    <div className='flex justify-between mb-10'>
        <div className='flex gap-3 mt-4'>
            <div className='w-44'>
                <p className='w-full mb-1'>Date From</p>
                <input className='py-2 px-4 w-full rounded-md border border-gray-300 text-sm text-[#4f4f4f]' type="date" />
            </div>
            <div className='w-44'>
                <p className='w-full mb-1'>Date To</p>
                <input className='py-2 px-4 w-full rounded-md border border-gray-300 text-sm text-[#4f4f4f] ' type="date" />
            </div>
        </div>
        <div className='flex gap-2'>
            <div className='border border-gray-300 h-20 w-40'></div>
            <div className='border border-gray-300 h-20 w-40'></div>
        </div>
    </div>
  )
}

export default DateRange