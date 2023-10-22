import React from 'react'

const ConfirmDialog = ({ open, setOpen, message, onConfirm }) => {
    return (
        <div className={`${open ? "block" : "hidden"} fixed inset-0 flex items-center justify-center z-50`}>
            <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
            <div className="bg-white rounded-lg p-4 shadow-lg z-50">
                <p className="mb-4">{message}</p>
                <div className="mt-4 flex justify-end">
                    <button onClick={() => {
                        onConfirm()
                        setOpen(!open)
                    }} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
                        Submit
                    </button>
                    <button onClick={() => setOpen(!open)} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDialog