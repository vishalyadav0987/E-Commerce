import {
    LOGIN_REQUEST,
    LOGIN_SUCEESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
} from '../constants/userConstants';
import axios from 'axios'

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



// clearing Error
const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}
export { login, clearError };