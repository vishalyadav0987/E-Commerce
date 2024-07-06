import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer, singleProductReducer } from './reducers/productReducer';
import { profileReducer, userReducer } from './reducers/userReducer';
import { cartReducre } from './reducers/cartReducre';
import { myOrderReducer, newOrderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
    products: productReducer,
    singleProduct: singleProductReducer,
    user: userReducer,
    profile: profileReducer,
    cart: cartReducre,
    newOrder: newOrderReducer,
    myOrders: myOrderReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    }
};

const middleware = [thunk];


const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;