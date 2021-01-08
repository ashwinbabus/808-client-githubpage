import React from "react";
import { useDrag } from "react-use-gesture";
import { useSpring, animated, config } from "react-spring";
import { connect } from "react-redux";
import {
  addItemToCart,
  clearItemFromCart,
  decreaseItemFromCart,
} from "../../redux/cart/cart.actions";
import Image from "cloudinary-react/lib/components/Image";

const CartProduct = ({ cartItem, increase, decrease, clear }) => {
  const [{ xy }, set] = useSpring( () => ({ xy: [0, 0], config: config.wobbly }) );


  const bind = useDrag(
    ({ down, movement }) => set({ xy: down ? movement : [0, 0] }),
    {
      bounds: { left: -200, right: 200, top: -75, bottom: 75 },
      rubberband : false
    }
  );

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  return (
    <animated.div
      className="cartproduct"
      {...bind()}
      style={{
        transform: xy.interpolate((x, y) => `translate3d(${x}px, ${y}px, 0)`),
      }}
    >
      <div className="cartproduct__image">
        <Image publicId={cartItem.imageUrl} alt="item" cloudName="ashwin808" className="unselectable"/>
        <div className="cartproduct__info">
          <h3 className="unselectable"> {cartItem.brand + " " + cartItem.title} </h3>
          <h5 className="unselectable"> {formatter.format(cartItem.price)} </h5>
        </div>
      </div>
      <div className="cartproduct__quantity">
        <h3
          className="cartproduct__quantity--action"
          onClick={() => decrease(cartItem)}
        >
          -
        </h3>
        <h4> {cartItem.quantity} </h4>
        <h3
          className="cartproduct__quantity--action"
          onClick={() => increase(cartItem)}
        >
          +
        </h3>
      </div>
      <div className="cartproduct__total">
        <h5> {formatter.format(cartItem.quantity * cartItem.price)} </h5>
      </div>
      <h5 id="close" onClick={() => clear(cartItem)}>
        {" "}
        X{" "}
      </h5>
    </animated.div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  increase: (cartItem) => dispatch(addItemToCart(cartItem)),
  decrease: (cartItem) => dispatch(decreaseItemFromCart(cartItem)),
  clear: (cartItem) => dispatch(clearItemFromCart(cartItem)),
});

export default connect(null, mapDispatchToProps)(CartProduct);
