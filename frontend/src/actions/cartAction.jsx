import axios from 'axios';
import { ADD_TO_CART } from '../constants/cartConstants';

const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    const response = await axios.get(`/api/v1/product/${id}`);
    dispatch({
        type: ADD_TO_CART,
        payload: {
            id: response.data.data._id,
            name: response.data.data.name,
            price: response.data.data.price,
            image: response.data.data.images[0].url,
            Stock: response.data.data.Stock,
            quantity,
        }
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));


}

export { addItemToCart };