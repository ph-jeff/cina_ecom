import React, { useEffect } from 'react'

const Range = ({limit, setLimit}) => {
  return (
    <>
        <div className='flex items-center gap-2 text-[14px]'>
            <label className="">Show</label>
            <select value={limit} onChange={(e) => setLimit(e.target.value)} className="p-1.5 rounded-md border border-gray-300 text-sm text-[#424242]">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
            </select>
            <span>Entries</span>
        </div>
    </>
  )
}

export default Range