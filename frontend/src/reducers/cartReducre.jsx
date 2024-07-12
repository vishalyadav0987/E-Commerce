import { ADD_TO_CART, REMOVE_ITEM_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

const cartReducre = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            const isItemExsit = state.cartItems.find((product) => product.productId === item.productId)
            console.log(isItemExsit, item.productId)
            if (isItemExsit) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((product) =>
                        product.productId === isItemExsit.productId ? item : product)
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
                    product.productId !== action.payload) // reduer me hum payload me id bhej raeh hai
            }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            }


        default:
            return state;
    }
}

export { cartReducre }
