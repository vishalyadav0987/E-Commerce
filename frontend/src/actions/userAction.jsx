import {
    LOGIN_REQUEST,
    LOGIN_SUCEESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCEESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCEESS,
    LOAD_USER_FAIL,
    CLEAR_ERRORS,
} from '../constants/userConstants';
import axios from 'axios'


// LOGIN
const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const response = await axios.post(
            `/api/v1/user/login`,
            { email, password }, // data
            config,
        );

        dispatch({
            type: LOGIN_SUCEESS,
            payload: response.data.user,
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}


//REGISTER
const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const response = await axios.post(
            `/api/v1/user/register`,
            userData, // data
            config,
        );

        dispatch({
            type: REGISTER_USER_SUCEESS,
            payload: response.data.user,
        })
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}



//LOAD USER
const loadUser = () => async (dispatch) => {
    try {
        dispatch({type:LOAD_USER_REQUEST});
        const response = await axios.get(`/api/v1/user/me`);
        dispatch({
            type: LOAD_USER_SUCEESS,
            payload: response.data.data,
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

// clearing Error
const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}
export { login, clearError, register,loadUser };