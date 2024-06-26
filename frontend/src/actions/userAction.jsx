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
    LOGOUT_USER_SUCEESS,
    LOGOUT_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCEESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCEESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
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
        dispatch({ type: LOAD_USER_REQUEST });
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


// Logout user
const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/user/auth/logout`);
        dispatch({
            type: LOGOUT_USER_SUCEESS,
        })
    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}



// UPDATE PROFILE
const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const response = await axios.put(
            `/api/v1/user/me/profile/update`,
            userData, // data
            config,
        );

        dispatch({
            type: UPDATE_PROFILE_SUCEESS,
            payload: response.data.success,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}



// UPDATE PASSWORD
const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const response = await axios.put(
            `/api/v1/user/password/update`,
            passwords, // data
            config,
        );

        dispatch({
            type: UPDATE_PASSWORD_SUCEESS,
            payload: response.data.success,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
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
export { login, clearError, register, loadUser, logout, updateProfile, updatePassword };