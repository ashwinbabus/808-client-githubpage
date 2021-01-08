import CartActionTypes from "./cart.action-types";
import { addItemToCart , decreaseItemFromCart} from "./cart.utils";

const INITIAL_STATE = {
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM_TO_CART:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case CartActionTypes.DECREASE_ITEM_FROM_CART:
        return{
            ...state,
            cartItems : decreaseItemFromCart(state.cartItems,action.payload)
        };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
        return{
            ...state,
            cartItems : state.cartItems.filter(cartItem => cartItem.sku !== action.payload.sku)
        }
    case CartActionTypes.CLEAR_CART :
        return{
            ...state,
            cartItems : []
        }
    default:
      return state;
  }
};

export default cartReducer;
