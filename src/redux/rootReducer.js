import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import shopReducer from "./shop/shop.reducer";
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import cartHideReducer from "./cart/cart-hide.reducer";
import ordersReducer from "./orders/orders.reducer";
import myAccountReducer from "./my-account/my-account.reducer";
import imagesReducer from "./images/images.reducer";
import addressReducer from "./addresses/address.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "myAccount", "user","addresses"],
};

const rootReducer = combineReducers({
  shop: shopReducer,
  user: userReducer,
  cart: cartReducer,
  cartHide: cartHideReducer,
  orders: ordersReducer,
  myAccount: myAccountReducer,
  images: imagesReducer,
  addresses: addressReducer,
});

export default persistReducer(persistConfig, rootReducer);
