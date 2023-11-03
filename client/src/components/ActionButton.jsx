import React from 'react'

const ActionButton = ({actionName}) => {
  return (
    <>
        <button className="bg-gray-800 hover:bg-gray-600 text-white py-2 px-4 rounded">
            {actionName}
        </button>
    </>
  )
}

export default ActionButton