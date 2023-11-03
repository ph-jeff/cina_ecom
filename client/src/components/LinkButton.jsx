import React from 'react'
import { Link } from 'react-router-dom'

const LinkButton = ({params, actionName}) => {
  return (
    <>
        <Link className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded" to={params} >{actionName}</Link>
    </>
  )
}

export default LinkButton