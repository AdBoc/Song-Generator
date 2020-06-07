import {
    AUTHORIZE,
    LOGIN_SUCCESS,
    LOGOUT
} from '../constants';

export const initialState = {
    isLogged: false,
    token: null
};

const authReducer = (state, action) => {
    switch (action.type) {
        case AUTHORIZE:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', JSON.stringify(action.payload));
            return {
                isLogged: true,
                token: action.payload
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                isLogged: false,
                token: null
            }
        default:
            return state;
    }
}

export default authReducer;