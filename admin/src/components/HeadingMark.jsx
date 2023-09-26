import React from 'react'

const HeadingMark = ({title}) => {
  return (
    <div className="mt-10 bg-white w-full p-4 shadow-md rounded-lg border border-slate-200 mb-5">
        <span>{title}</span>
    </div>
  )
}

export default HeadingMark