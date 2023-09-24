import { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {

    const user = localStorage.getItem('user');
    
    const [state, dispatch] = useReducer(authReducer, {
        user: user ?? null
    });

    useEffect(() => {
        if(user){
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])

    console.log('Auth Context state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}