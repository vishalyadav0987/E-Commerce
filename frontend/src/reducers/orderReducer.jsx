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
    CLEAR_ERRORS,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_RESET,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_RESET
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
const myOrderReducer = (state = { orders: [] }, action) => {
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
                loading: false,
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

const allOrderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ALL_ORDERS_REQUEST:
            return {
                loading: true,
            }
        case ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload.data,
                totalAmount: action.payload.totalAmount
            }
        case ALL_ORDERS_FAIL:
            return {
                loading: false,
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
const updateAndDeleteOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success,
                message: action.payload.message
            }
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
                message: action.payload.message
            }
        case UPDATE_ORDER_FAIL:
        case DELETE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted: false
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
                loading: false,
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

export { newOrderReducer, myOrderReducer, singleOrderDetailsReducer, allOrderReducer, updateAndDeleteOrderReducer }