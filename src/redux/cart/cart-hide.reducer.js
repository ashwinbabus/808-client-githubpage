import CartActionTypes from './cart.action-types';

const INITIAL_STATE = {
  isCartHidden: false,
}

const cartHideReducer = (state=INITIAL_STATE,action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                isCartHidden : !state.isCartHidden
            };
        default:
            return state;
    }
}

export default cartHideReducer;