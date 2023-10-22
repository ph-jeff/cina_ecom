import React from 'react'
import ActionButton from '../../../components/ActionButton'

const ChangePassword = () => {
    
    function updatePassword(e){
        e.preventDefault()
    }

    return (
        <div className="w-full md:w-1/2">
            <div className="bg-white shadow-md p-4 rounded-md">
                <form onSubmit={updatePassword}>
                    <p className="text-xl">Change Password</p>
                    <div className="mt-2 mb-2">
                        <label htmlFor="current_password" className="block mb-2">
                            Current Password
                        </label>
                        <input
                            id="current_password"
                            type="text"
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="new_password" className="block mb-2">
                            New Password
                        </label>
                        <input
                            id="new_password"
                            type="text"
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="confirm_password" className="block mb-2">
                            Confirm Password
                        </label>
                        <input
                            id="confirm_password"
                            type="text"
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                    <ActionButton actionName={'Update Password'} />
                </form>
            </div>
        </div>
    )
}

export default ChangePassword