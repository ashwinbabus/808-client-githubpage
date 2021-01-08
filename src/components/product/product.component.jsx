import React from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { addItemToCart, toggleCartHidden } from "../../redux/cart/cart.actions";
import _ from "lodash";
import { useSpring, animated, config } from "react-spring";

import CustomButton from "../custom-button/custom-button.component";

import "./product.styles.scss";
import Image from "cloudinary-react/lib/components/Image";

const Product = ({ item, addToCart, toggleCartHidden }) => {
  let history = useHistory();
  const params = useParams();
  const goToProduct = (sku, category) => {
    console.log("params :: ",params);
    _.isEmpty(params)
      ? history.push(`shop/${category}/${sku}`)
      : history.push(`${category}/${sku}`);
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  const handleAddToCart = (product) => {
    const cartItemToBeAdded = {
      brand: product.brand,
      title: product.title,
      sku: product.sku,
      price: product.price,
      quantity: 1,
      imageUrl: product.images[0],
    };
    addToCart(cartItemToBeAdded);
    toggleCartHidden();
  };

  const [props, set] = useSpring(() => ({ s: 1, config: config.stiff }));
  const trans = (s) => `scale(${s})`;

  return (
    <animated.div
      className="product"
      onMouseEnter={() => set({ s: 1.1 })}
      onMouseLeave={() => set({ s: 1 })}
      style={{ transform: props.s.interpolate(trans) }}
    >
      <div className="product__image-container">
        <Image
          className="product__image"
          publicId = {item.images[0]}
          cloudName = "ashwin808"
          height = "200"
          onClick={() => goToProduct(item.sku, item.category)}
        />
      </div>
      <div className="product__info">
        <h5>
          {" "}
          {item.brand} {item.title}
        </h5>
        <h6>{formatter.format(item.price)}</h6>
      </div>
      {item.variants && Object.keys(item.variants).length > 0 ? (
        <CustomButton
          inverted
          toggle={() => goToProduct(item.sku, item.category)}
        >
          Select Options
        </CustomButton>
      ) : (
        <CustomButton inverted toggle={() => handleAddToCart(item)}>
          Add to cart
        </CustomButton>
      )}
    </animated.div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addToCart: (cartItem) => dispatch(addItemToCart(cartItem)),
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(null, mapDispatchToProps)(Product);
