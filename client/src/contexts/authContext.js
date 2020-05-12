import React, { createContext, useState } from 'react';

export const authContext = createContext();

const AuthContextProvider = (props) => {
    const [authStatus, setAuthStatus] = useState(
        { isLogged: false }
    )
    const login = () => {
        setAuthStatus({ isLogged: true })
    }
    const logout = () => {
        setAuthStatus({ isLogged: false })
    }
    return (
        <authContext.Provider value={{ authStatus, login, logout }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthContextProvider;

//BYC MOZE POWINIENEM ZROBIC INITIAL STATE W FUNKCJI createContext ??