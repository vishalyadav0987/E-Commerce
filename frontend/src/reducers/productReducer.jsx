import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCEESS,
    ALL_PRODUCT_FAIL,
    SINGLE_PRODUCT_REQUEST,
    SINGLE_PRODUCT_SUCEESS,
    SINGLE_PRODUCT_FAIL,
    CLEAR_ERRORS,
} from '../constants/productConstants';
const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
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
            }
        case ALL_PRODUCT_FAIL:
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

export  { productReducer, singleProductReducer };
