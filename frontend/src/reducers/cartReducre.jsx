import { ADD_TO_CART, REMOVE_ITEM_FROM_CART } from "../constants/cartConstants";

const cartReducre = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            const isItemExsit = state.cartItems.find((product) => product.id === item.id)
            if (isItemExsit) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((product) =>
                        product.id === isItemExsit.id ? item : product)
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((product) =>
                    product.id !== action.payload) // reduer me hum payload me id bhej raeh hai
            }


        default:
            return state;
    }
}

export { cartReducre }
