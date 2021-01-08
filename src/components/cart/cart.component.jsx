import React from "react";
import "./cart.styles.scss";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  addItemToCart,
  clearItemFromCart,
  decreaseItemFromCart,
  toggleCartHidden,
} from "../../redux/cart/cart.actions";

import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectCartTotal,
  selectIsCartHidden,
} from "../../redux/cart/cart.selector";

import CustomButton from "../custom-button/custom-button.component";
import { useTransition, animated, config } from "react-spring";
import Image from "cloudinary-react/lib/components/Image";
import { selectCurrentUser } from "../../redux/user/user.selector";

const Cart = ({
  toggleCartHidden,
  cartItems,
  total,
  addItemToCart,
  decreaseItemFromCart,
  clearItemFromCart,
  isCartHidden,
  currentUser,
}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  const history = useHistory();

  const goToCart = () => {
    toggleCartHidden();
    if (currentUser) {
      history.push("/cart");
    } else {
      history.push("/my-account");
    }
  };

  const transition = useTransition(isCartHidden, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.stiff,
  });

  return (
    <div>
      {transition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              className="cart-preview-container"
              style={props}
              key={key}
            >
              <div
                className="cart-preview-transparent-bg"
                onClick={toggleCartHidden}
              ></div>
              <div className="cart-preview-box">
                <div className="cart-header">
                  <h3>CART</h3>
                  <h4 className="cart-header-close" onClick={toggleCartHidden}>
                    X
                  </h4>
                </div>

                <div
                  className={`cart-items-container ${
                    cartItems.length ? "" : "align-cart-items"
                  } `}
                >
                  {cartItems && cartItems.length > 0 ? (
                    cartItems.map((cartItem, index) => (
                      <div className="cart-items" key={index}>
                        <Image
                          publicId={cartItem.imageUrl}
                          cloudName="ashwin808"
                          height="120"
                          className="cart-item-image"
                        />
                        {console.log("cartitemmmmmm ::: ", cartItem)}
                        <div className="cart-item-details">
                          <p>
                            {cartItem.brand} {cartItem.title}
                          </p>
                          <p>{formatter.format(cartItem.price)}</p>
                          <div className="cart-item-actions">
                            <div className="cart-item-quantity-selector">
                              <div className="quantity-selector">
                                <div
                                  className="decrease-quantity"
                                  onClick={() => decreaseItemFromCart(cartItem)}
                                >
                                  -
                                </div>
                                <div> {cartItem.quantity} </div>
                                <div
                                  className="increase-quantity"
                                  onClick={() => addItemToCart(cartItem)}
                                >
                                  +
                                </div>
                              </div>
                            </div>
                            <div
                              className="remove-item"
                              onClick={() => clearItemFromCart(cartItem)}
                            >
                              REMOVE
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="cart-is-empty">
                      <h3>YOUR CART IS EMPTY</h3>
                    </div>
                  )}
                </div>
                {cartItems.length > 0 ? (
                  <div className="checkout-button">
                    <CustomButton toggle={goToCart}>
                      <span>CHECKOUT</span>
                      <span className="separator-dot">.</span>
                      <span className="total_amount">
                        {formatter.format(total)}
                      </span>
                    </CustomButton>
                  </div>
                ) : null}
              </div>
            </animated.div>
          )
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
  addItemToCart: (cartItem) => dispatch(addItemToCart(cartItem)),
  decreaseItemFromCart: (cartItem) => dispatch(decreaseItemFromCart(cartItem)),
  clearItemFromCart: (cartItem) => dispatch(clearItemFromCart(cartItem)),
});

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  isCartHidden: selectIsCartHidden,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
