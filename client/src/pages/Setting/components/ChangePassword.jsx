import React, { useState } from 'react'
import ActionButton from '../../../components/ActionButton'
import api from '../../../services/apiRequest'
import { toast } from 'react-hot-toast';

const ChangePassword = () => {

    const [current_password, setCurrentPassword] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    
    function updatePassword(e){
        e.preventDefault()
        if(!current_password || !new_password || !confirm_password){
            return
        }
        api.put('/api/user/account/change-password', {
            current_password,
            new_password,
            confirm_password
        })
        .then(response => {
            console.log(response)
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            toast.success('Updated successfully');
        })
        .catch(error => {
            console.log(error)
            toast.error(error.response.data.error);
        })
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
                            type="password"
                            className="w-full p-2 border rounded-md"
                            value={current_password}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="new_password" className="block mb-2">
                            New Password
                        </label>
                        <input
                            id="new_password"
                            type="password"
                            className="w-full p-2 border rounded-md"
                            value={new_password}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="confirm_password" className="block mb-2">
                            Confirm Password
                        </label>
                        <input
                            id="confirm_password"
                            type="password"
                            className="w-full p-2 border rounded-md"
                            value={confirm_password}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <ActionButton actionName={'Update Password'} />
                </form>
            </div>
        </div>
    )
}

export default ChangePassword