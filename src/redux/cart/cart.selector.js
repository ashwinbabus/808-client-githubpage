import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

const selectCartHide = state => state.cartHide;

export const selectIsCartHidden = createSelector(
  [selectCartHide],
  (cartHide) => cartHide.isCartHidden
);

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumalatedQuantity, cartItem) =>
      accumalatedQuantity + cartItem.quantity * cartItem.price,0
  )
);
