import React from 'react'
import DateRange from './DateRange';
import Range from './Range';

const TableHeader = ({limit, setLimit, query, setQuery, dateFrom, setDateFrom, dateTo, setDateTo}) => {
  return (
    <div className='mt-8 px-10 text-sm'>
        <DateRange
            dateFrom={dateFrom} setDateFrom={setDateFrom}
            dateTo={dateTo} setDateTo={setDateTo}
        />
        <div className='flex justify-between w-full'>
            <Range limit={limit} setLimit={setLimit} />
            <div className="relative flex justify-end w-full gap-3">
                <div className="absolute inset-y-0 right-[185px] flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 flex flex-end text-[#686868] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>    
                </div>
                <input className='block pl-10 py-2 px-4 w-38 rounded-xl border border-[#686868] text-sm' type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search ...' style={{ backgroundColor: 'transparent' }} />
            </div>
        </div>
    </div>
  )
}

export default TableHeader