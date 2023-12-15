import React, { useEffect } from 'react'

const Range = ({setLimit}) => {
  return (
    <>
        <select onChange={(e) => setLimit(e.target.value)} name="" id="">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
        </select>
    </>
  )
}

export default Range