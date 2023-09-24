import { useAuthContext } from "./useAuthContext";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import api from "../services/apiRequest";
import { toast } from "react-hot-toast";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {dispatch} = useAuthContext();
    const navigate = useNavigate();

    const login = (email, password) => {
        setIsLoading(true);
        api.post('/api/user/auth/login',{
            email,
            password,
        })
        .then(response => {
            toast.success(`Welcome ${response.data.user.email}`);
            localStorage.setItem('user', response.data.user.email);
            dispatch({type: 'LOGIN', payload: response.data.user.email})
            setIsLoading(false);
            navigate('/');
        })
        .catch(err => {
            toast.error(err.response.data.error);
            localStorage.removeItem('user');
            setIsLoading(false);
            localStorage.removeItem('user');
            // navigate('/login');
        })
    }
    return { login, isLoading };
}