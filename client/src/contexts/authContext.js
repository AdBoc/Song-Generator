import React, { createContext, useReducer } from 'react';
import authReducer from '../reducers/authReducer';
import { initialState } from '../reducers/authReducer';

export const authContext = createContext();

const AuthContextProvider = (props) => {
    const [authStatus, dispatch] = useReducer(authReducer, initialState);

    return (
        <authContext.Provider value={{ authStatus, dispatch }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthContextProvider;