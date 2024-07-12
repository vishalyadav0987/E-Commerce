import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    CLEAR_ERRORS,
    SINGLE_ORDER_DETAILS_REQUEST,
    SINGLE_ORDER_DETAILS_SUCCESS,
    SINGLE_ORDER_DETAILS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL
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


//Fetch MY ORDER
const getMyOrder = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDER_REQUEST })
        const response = await axios.get('/api/v1/order/me/orders');
        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: response.data.data
        })
    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

// GET ALL ORDER FOR ADMIN PANEL
const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST });
        const response = await axios.get('/api/v1/order/orders');
        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: response.data,
        })
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

//UPDATE ORDER -- ADMIN
const updateOrder = (id,orderStatus)=>async(dispatch)=>{
    try {
        dispatch({type:UPDATE_ORDER_REQUEST});
        const response = await axios.put(
            `/api/v1/order/orders/update/status/${id}`,
            orderStatus,
            {headers:{"Content-Type":"application/json"}}
        );
        dispatch({
            type:UPDATE_ORDER_SUCCESS,
            payload:response.data,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

//DELETE ORDER -- ADMIN
const deleteOrder = (id)=>async(dispatch)=>{
    try {
        dispatch({type:DELETE_ORDER_REQUEST});
        const response = await axios.delete(`/api/v1/order/orders/delete/${id}`);
        dispatch({
            type:DELETE_ORDER_SUCCESS,
            payload:response.data,
        })
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}


//Single Order Details MY ORDER
const singleOrderDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_ORDER_DETAILS_REQUEST })
        const response = await axios.get(`/api/v1/order/orders/${id}`);
        dispatch({
            type: SINGLE_ORDER_DETAILS_SUCCESS,
            payload: response.data.data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_ORDER_DETAILS_FAIL,
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

export { createOrder, getMyOrder, singleOrderDetail, getAllOrders,updateOrder,deleteOrder, clearError }