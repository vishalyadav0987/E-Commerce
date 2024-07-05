import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CLEAR_ERRORS
} from '../constants/orderConstants';
import axios from 'axios'

//CREATE ORDER
const createOrder = (orderDetails) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })
        const response = await axios.post(
            '/api/v1/order/orders/place',
            orderDetails, { headers: { "Content-Type": "application/json" } }
        )
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: response.data.data,
        })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
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

export { createOrder,clearError }