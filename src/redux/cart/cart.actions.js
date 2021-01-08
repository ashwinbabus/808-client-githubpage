import CartActionTypes from './cart.action-types';

export const toggleCartHidden = () => ({
    type : CartActionTypes.TOGGLE_CART_HIDDEN
})

export const addItemToCart = (cartItem) => ({
    type : CartActionTypes.ADD_ITEM_TO_CART,
    payload : cartItem
})

export const decreaseItemFromCart = cartItem => ({
    type : CartActionTypes.DECREASE_ITEM_FROM_CART,
    payload : cartItem
})

export const clearItemFromCart = cartItem => ({
    type : CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload : cartItem
})

export const clearCart = () => ({
    type : CartActionTypes.CLEAR_CART
})