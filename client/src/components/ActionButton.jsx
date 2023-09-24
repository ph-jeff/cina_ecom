import React from 'react'

const ActionButton = ({actionName}) => {
  return (
    <>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            {actionName}
        </button>
    </>
  )
}

export default ActionButton