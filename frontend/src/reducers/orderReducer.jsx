import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    SINGLE_ORDER_DETAILS_REQUEST,
    SINGLE_ORDER_DETAILS_SUCCESS,
    SINGLE_ORDER_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/orderConstants';

const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: true,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                error: null,
                ...state,
            }


        default:
            return state;
    }
}
const myOrderReducer = (state = [], action) => {
    switch (action.type) {
        case MY_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case MY_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case MY_ORDER_FAIL:
            return {
                loading: true,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                error: null,
                ...state,
            }


        default:
            return state;
    }
}

const singleOrderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case SINGLE_ORDER_DETAILS_REQUEST:
            return {
                loading: true,
            }
        case SINGLE_ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case SINGLE_ORDER_DETAILS_FAIL:
            return {
                loading: true,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                error: null,
                ...state,
            }


        default:
            return state;
    }
}

export { newOrderReducer, myOrderReducer, singleOrderDetailsReducer }