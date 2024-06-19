import axios from 'axios'
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCEESS,
    ALL_PRODUCT_FAIL,
    SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_SUCEESS,
    SINGLE_PRODUCT_FAIL,
    CLEAR_ERRORS,
} from '../constants/productConstants';

const getAllProducts = (keyword="") => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });


        let link = `/api/v1/product/products?keyword=${keyword}`

        const response = await axios.get(link);
        dispatch({
            type: ALL_PRODUCT_SUCEESS,
            payload: response.data.data,
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get Single product detail
const getSingleProducts = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_PRODUCT_REQUEST });
        const response = await axios.get(`/api/v1/product/${id}`);
        dispatch({
            type: SINGLE_PRODUCT_SUCEESS,
            payload: response.data.data,
        })
    } catch (error) {
        dispatch({
            type: SINGLE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


// clearing Error
const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}


export { getAllProducts, clearError, getSingleProducts }