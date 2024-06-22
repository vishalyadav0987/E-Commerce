import {
    LOGIN_REQUEST,
    LOGIN_SUCEESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
} from '../constants/userConstants';

const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loading: true,
                isAuthenticate: false,
            }
        case LOGIN_SUCEESS:
            return {
                ...state,
                loading: false,
                isAuthenticate: true,
                user: action.payload,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticate: false,
                user: null,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export { userReducer };
