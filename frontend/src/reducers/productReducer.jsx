import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCEESS,
    ALL_PRODUCT_FAIL,
    ADMIN_ALL_PRODUCT_REQUEST,
    ADMIN_ALL_PRODUCT_SUCEESS,
    ADMIN_ALL_PRODUCT_FAIL,
    ADD_NEW_PRODUCT_REQUEST,
    ADD_NEW_PRODUCT_SUCEESS,
    ADD_NEW_PRODUCT_FAIL,
    ADD_NEW_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCEESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCEESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,
    SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_SUCEESS,
    SINGLE_PRODUCT_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCEESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    GET_ALL_REVIEWS_REQUEST,
    GET_ALL_REVIEWS_SUCEESS,
    GET_ALL_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCEESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
    CLEAR_ERRORS,
} from '../constants/productConstants';
const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                product: [],
            }
        case ALL_PRODUCT_SUCEESS:
            return {
                loading: false,
                product: action.payload.data,
                productsCount: action.payload.count,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount,
            }
        case ADMIN_ALL_PRODUCT_SUCEESS:
            return {
                loading: false,
                products: action.payload,
            }
        case ALL_PRODUCT_FAIL:
        case ADMIN_ALL_PRODUCT_FAIL:
            return {
                loading: false,
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


const singleProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case SINGLE_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state
            }
        case SINGLE_PRODUCT_SUCEESS:
            return {
                loading: false,
                product: action.payload,
            }
        case SINGLE_PRODUCT_FAIL:
            return {
                loading: false,
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

const addNewProductReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case ADD_NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADD_NEW_PRODUCT_SUCEESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.data,
            }
        case ADD_NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADD_NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

const deleteUpdateProductReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DELETE_PRODUCT_SUCEESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            }
        case UPDATE_PRODUCT_SUCEESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}


const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case NEW_REVIEW_SUCEESS:
            return {
                loading: false,
                success: action.payload,
            }
        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false,
            }
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}

const allProductReviewReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case GET_ALL_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_ALL_REVIEWS_SUCEESS:
            return {
                ...state,
                loading: false,
                reviews: action.payload,
            }
        case GET_ALL_REVIEWS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                error: null,
                ...state,
            }
        default:
            return state
    }
}

const deleteProductReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DELETE_REVIEW_SUCEESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
                message: action.payload.message
            }
        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.message
            }
        case DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false,

            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export { productReducer, singleProductReducer, newReviewReducer, addNewProductReducer, deleteUpdateProductReducer, allProductReviewReducer,deleteProductReviewReducer };
