import { useAuthContext } from "./useAuthContext";
import api from "../services/apiRequest";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useState } from "react";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const logout = () => {
        setIsLoading(true)
        api.post('/api/user/auth/logout')
        .then((response) => {
            console.log(response);
            dispatch({type: 'LOGOUT'})
            localStorage.removeItem('user');
            setIsLoading(false)
            navigate('/login');
        })
        .catch((err) => {
            console.log(err.response)
            setIsLoading(false)
        })
    }
    return { logout, isLoading }
}