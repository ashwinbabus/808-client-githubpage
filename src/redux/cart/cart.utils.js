
import _ from "lodash";

export const addItemToCart = (cartItems,cartItemToAdd) => {
    const existingItem = cartItems.find(
        cartItem => cartItem.sku === cartItemToAdd.sku && _.isEqual(cartItem.variants,cartItemToAdd.variants)
    );

    if(existingItem)    {
        return cartItems.map(cartItem => 
            cartItem.sku === cartItemToAdd.sku && _.isEqual(cartItem.variants,cartItemToAdd.variants)
            ? { ...cartItem, quantity : cartItem.quantity+1}
            : cartItem
            )
    }

    return [...cartItems,cartItemToAdd]
}

export const decreaseItemFromCart = (cartItems, cartItemToRemove) => {
    const existingItem = cartItems.find(
      cartItem => cartItem.sku === cartItemToRemove.sku && _.isEqual(cartItem.variants,cartItemToRemove.variants)
    );
  
    if (existingItem.quantity === 1) {
      return cartItems.filter(cartItem => cartItem.sku !== cartItemToRemove.sku);
    }
  
    return cartItems.map(cartItem =>
      cartItem.sku === cartItemToRemove.sku && _.isEqual(cartItem.variants,cartItemToRemove.variants)
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  };