import {
    AUTHORIZE,
    LOGIN_SUCCESS
} from '../constants';

export const initialState = {
    isLogged: false
};

const authReducer = (state, action) => {
    switch (action.type) {
        case AUTHORIZE:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLogged: true
            }
        default:
            return state;
    }
}

export default authReducer;