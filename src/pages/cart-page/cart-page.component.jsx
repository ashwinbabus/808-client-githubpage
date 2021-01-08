import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import Header from "../../components/header/header.component";
import YourAddresses from "../../components/your-addresses/your-addresses.component";

import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selector";
import { useTrail, animated, config, useTransition } from "react-spring";

import "./cart-page.styles.scss";
import CustomButton from "../../components/custom-button/custom-button.component";
import CartProduct from "./cart-product.component";

const CartPage = ({ user, cartItems, total }) => {
  const [headerBg, setHeaderBg] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  const handleScroll = (event) => {
    if (event.srcElement.scrollingElement.scrollTop >= 100) {
      setHeaderBg(true);
    } else {
      setHeaderBg(false);
    }
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  const transition = useTransition(showAddresses, null, {
    from: { opacity: 0, height: "0%" },
    enter: { opacity: 1, height: "50%" },
    leave: { opacity: 0, height: "0%" },
    config: config.stiff,
  });

  const trail = useTrail(cartItems.length, {
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: config.slow,
  });

  return (
    <div>
      <Header transparent background={headerBg} />
      <div className="cartpage">
        <div className="cartpage__container">
          <div className="cartpage__title">
            {/* <BackIcon /> */}
            <h1>Shopping Cart</h1>
          </div>

          <div className="cartpage__cart">
            {cartItems && cartItems.length > 0
              ? trail.map((props, index) => {
                  const cartItem = cartItems[index];
                  return (
                    <animated.div
                      // className="cartproduct"
                      style={props}
                      key={index}
                    >
                      <CartProduct cartItem={cartItem} />
                    </animated.div>
                  );
                })
              : null}
          </div>

          <div className="cartpage__checkout"  >
            <h1 className="credit__card">
              {" "}
              Use this card number with any CVV and an exipiry date in the
              future : 4242 4242 4242 4242{" "}
            </h1>

            <CustomButton toggle={() => setShowAddresses(true)}>
              {" "}
              {"Checkout " + formatter.format(total)}
            </CustomButton>
          </div>
        </div>
        {transition.map(
          ({ item, key, props }) =>
            item && (
              <animated.div
                className="cartpage__selectaddress"
                style={props}
                key={key}
              >
                <h1
                  onClick={() => setShowAddresses(false)}
                  style={{ cursor: "pointer" }}
                >
                  x
                </h1>
                <YourAddresses  checkout />
              </animated.div>
            )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CartPage);
