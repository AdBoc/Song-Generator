import { AUTHORIZE } from '../constants'

export const authReducer = (state, action) => {
    switch (action.type) {
        case AUTHORIZE:
            return [
                ...state,
                {
                    isLogged: true
                }
            ]
        default:
            return state;
    }
}