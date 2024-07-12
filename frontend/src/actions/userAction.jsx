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
    GET_ALL_USER_REQUEST,
    GET_ALL_USER_SUCEESS,
    GET_ALL_USER_FAIL,
    SINGLE_USER_DETAILS_REQUEST,
    SINGLE_USER_DETAILS_SUCEESS,
    SINGLE_USER_DETAILS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCEESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCEESS,
    UPDATE_USER_FAIL,
} from '../constants/userConstants';
import axios from 'axios';
import Cookies from 'js-cookie'


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
            payload: response.data,
        })
        Cookies.set('token', response.data.token);
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

        if (response.data.success) {
            dispatch({
                type: REGISTER_USER_SUCEESS,
                payload: response.data,
            })
            Cookies.set('token', response.data.token);
        }
        else {
            dispatch({
                type: REGISTER_USER_FAIL,
                payload: response.data.message
            });
        }
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
        if (response.data.success) {
            dispatch({
                type: LOAD_USER_SUCEESS,
                payload: response.data,
            })
        }
        else {
            dispatch({
                type: LOAD_USER_FAIL,
            })
        }
        console.log(response.data)
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

//GET ALL USERS --- ADMIN
const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_USER_REQUEST });
        const response = await axios.get(
            '/api/v1/user/users'
        );
        dispatch({
            type: GET_ALL_USER_SUCEESS,
            payload: response.data.data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_USER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

// GET SINGLE USER DETAILS --- ADMIN
const getSingleUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_USER_DETAILS_REQUEST });
        const response = await axios.get(
            `/api/v1/user/${id}`
        );
        dispatch({
            type: SINGLE_USER_DETAILS_SUCEESS,
            payload: response.data.data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

//UPDATE USER --- ADMIN --SPECIAL---ROLE OF USER
const updateUser = (id,userData)=>async(dispatch)=>{
    try {
        dispatch({ type: UPDATE_USER_REQUEST });
        const response = await axios.put(
            `/api/v1/user/role/${id}`,
            userData,
            {headers:{"Content-Type":"application/json"}}
        );
        dispatch({
            type: UPDATE_USER_SUCEESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}


// DELETE USER --- ADMIN
const deleteUser =(id)=>async(dispatch)=>{
    try {
        dispatch({ type: DELETE_USER_REQUEST });
        const response = await axios.delete(
            `/api/v1/user/delete/${id}`
        );
        dispatch({
            type: DELETE_USER_SUCEESS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
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
export { login, clearError, register, loadUser, logout, updateProfile, updatePassword, getAllUsers, getSingleUserDetails,deleteUser,updateUser };