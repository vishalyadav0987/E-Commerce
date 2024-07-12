import axios from 'axios'
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCEESS,
    ALL_PRODUCT_FAIL,
    SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_SUCEESS,
    SINGLE_PRODUCT_FAIL,
    CLEAR_ERRORS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCEESS,
    NEW_REVIEW_FAIL,
    ADMIN_ALL_PRODUCT_REQUEST,
    ADMIN_ALL_PRODUCT_SUCEESS,
    ADMIN_ALL_PRODUCT_FAIL,
    ADD_NEW_PRODUCT_REQUEST,
    ADD_NEW_PRODUCT_SUCEESS,
    ADD_NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCEESS,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCEESS,
    UPDATE_PRODUCT_FAIL,
    GET_ALL_REVIEWS_FAIL,
    GET_ALL_REVIEWS_REQUEST,
    GET_ALL_REVIEWS_SUCEESS,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCEESS,
    DELETE_REVIEW_FAIL,
} from '../constants/productConstants';

const getAllProducts = (keyword = "", currentPage = 1, price = [200, 10000], category, ratings = 0) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });


        let link = `/api/v1/product/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

        if (category) {
            link = `/api/v1/product/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }

        const response = await axios.get(link);
        dispatch({
            type: ALL_PRODUCT_SUCEESS,
            payload: response.data,
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// ADD NEW NEW PRODUCT
const addNewProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: ADD_NEW_PRODUCT_REQUEST });
        const response = await axios.post(
            `/api/v1/product/new`,
            productData,
            { headers: { "Content-Type": "applicationjson" } }
        );
        dispatch({
            type: ADD_NEW_PRODUCT_SUCEESS,
            payload: response.data,
        })
    } catch (error) {
        dispatch({
            type: ADD_NEW_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

//UPDATE PRODUCT
const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });
        const response = await axios.put(
            `/api/v1/product/${id}`,
            productData,
            { headers: { "Content-Type": "application/json" } }
        );
        dispatch({
            type: UPDATE_PRODUCT_SUCEESS,
            payload: response.data.success,
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


// DELETE PRODUCT 
const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });
        const response = await axios.delete(`/api/v1/product/${id}`);
        dispatch({
            type: DELETE_PRODUCT_SUCEESS,
            payload: response.data.success,
        })
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

// FTCH ALL PRODUCT LIST FOR ADMIN
const productForAdminPanel = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ALL_PRODUCT_REQUEST });
        const response = await axios.get('/api/v1/product/admin/products');
        dispatch({
            type: ADMIN_ALL_PRODUCT_SUCEESS,
            payload: response.data.data,
        })
    } catch (error) {
        dispatch({
            type: ADMIN_ALL_PRODUCT_FAIL,
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

// NEW REVIEW
const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST })
        const response = await axios.post(
            `/api/v1/product/review`,
            reviewData,
            { headers: { "Content-Type": "application/json" } }
        );
        dispatch({
            type: NEW_REVIEW_SUCEESS,
            payload: response.data.success,
        })
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

// GET ALL REVIESW OF PRODUCT --- ADMIN
const getAllProductReviews = (productId) => async (dispatch) => {
    try {
        dispatch({ type: GET_ALL_REVIEWS_REQUEST })
        const response = await axios.get(
            `/api/v1/product/review/all?productId=${productId}`,
        );
        dispatch({
            type: GET_ALL_REVIEWS_SUCEESS,
            payload: response.data.reviews,
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_REVIEWS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}


// DELETE REVIEW OF PRODUCT --- ADMIN
const deleteProductReviews = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST })
        const response = await axios.delete(
            `/api/v1/product/review/delete?reviewId=${reviewId}&productId=${productId}`,
        );
        dispatch({
            type: DELETE_REVIEW_SUCEESS,
            payload: response.data,
        })
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
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


export { getAllProducts, clearError, getSingleProducts, newReview, productForAdminPanel, addNewProduct, deleteProduct, updateProduct, getAllProductReviews,deleteProductReviews }