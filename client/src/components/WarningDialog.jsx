import React from 'react'

const WarningDialog = ({ warning, setWarning, message, onCancel }) => {
    return (
        // <div className={`${warning ? "block" : "hidden"} fixed inset-0 flex items-center justify-center z-50`}>
        //     <div className="fixed inset-0 bg-gray-800 opacity-50"></div>
        //     <div className="bg-white rounded-lg p-4 shadow-lg z-50">
        //         <div className="h-24 flex justify-between items-center">
        //             <p className='text-red-600 text-xl'>{message}</p>
        //         </div>
        //         <div className="mt-4 flex justify-around">
        //             <button onClick={() => {
        //                 onCancel()
        //                 setWarning(!warning)
        //             }} className="bg-green-600 text-white px-4 py-2 rounded-lg mr-2">
        //                 Proceed
        //             </button>
        //             <button onClick={() => setWarning(!warning)} className="bg-red-500 text-white px-4 py-2 rounded-lg">
        //                 Cancel
        //             </button>
        //         </div>
        //     </div>
        // </div>
        <div className={`${warning ? "block" : "hidden"} fixed inset-0 flex items-center justify-center z-50`}>
            <div className="fixed inset-0 bg-gray-900 opacity-60"></div>
            <div className="bg-white rounded-lg p-6 shadow-lg z-50 w-96">
                <div className="flex items-center justify-center ">
                    <div className="rounded-full bg-slate-200 w-12 h-12 flex items-center justify-center">
                        <span className="text-red-600 text-3xl font-bold">!</span>
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-red-600 text-lg font-semibold">{message}</p>
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={() => {
                            onCancel();
                            setWarning(!warning);
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-700 transition duration-300"
                    >
                        Proceed
                    </button>
                    <button
                        onClick={() => {
                            setWarning(!warning);
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WarningDialog