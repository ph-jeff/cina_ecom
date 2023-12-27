import React from 'react'

const WarningDialog = ({ warning, setWarning, message, onCancel }) => {
    return (
        <div className={`${warning ? "block" : "hidden"} fixed inset-0 flex items-center justify-center z-50`}>
            <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
            <div className="bg-white rounded-lg p-4 shadow-lg z-50">
                <div className="h-24 flex justify-between items-center">
                    <p className='text-red-600 text-xl'>{message}</p>
                </div>
                <div className="mt-4 flex justify-around">
                    <button onClick={() => {
                        onCancel()
                        setWarning(!warning)
                    }} className="bg-green-600 text-white px-4 py-2 rounded-lg mr-2">
                        Proceed
                    </button>
                    <button onClick={() => setWarning(!warning)} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WarningDialog