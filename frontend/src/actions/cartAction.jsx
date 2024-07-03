import axios from 'axios';
import { ADD_TO_CART, REMOVE_ITEM_FROM_CART, SAVE_SHIPPING_INFO } from '../constants/cartConstants';

// ADD TO CART
// const addItemToCart = (id, quantity) => async (dispatch, getState) => {
//     const response = await axios.get(`/api/v1/product/${id}`);
//     dispatch({
//         type: ADD_TO_CART,
//         payload: {
//             id: response.data.data._id,
//             name: response.data.data.name,
//             price: response.data.data.price,
//             image: response.data.data.images[0].url,
//             Stock: response.data.data.Stock,
//             quantity,
//         }
//     });

//     localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));


// }

const addItemToCart = (productId, quantity) => async (dispatch) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const response = await axios.post(`/api/v1/cart/add`, { productId, quantity }, config);
    dispatch({
        type: ADD_TO_CART,
        payload: {
            cartItems: response.data.cartData
        }
    });



}

// REMOVE FROM CART
// const removeFromCart = (id) => async (dispatch, getState) => {
//     dispatch({
//         type: REMOVE_ITEM_FROM_CART,
//         payload: id,
//     });
//     localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

// }

const removeFromCart = (id) => async (dispatch) => {
    // const response = await axios.post(`/api/v1/cart/remove`, { productId, quantity }, config);
    // dispatch({
    //     type: REMOVE_ITEM_FROM_CART,
    //     payload: response.data.message
    // });

}


// SAVE SHIPPING INFO
const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
}

export { addItemToCart, removeFromCart, saveShippingInfo };