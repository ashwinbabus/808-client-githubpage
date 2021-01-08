import Image from "cloudinary-react/lib/components/Image";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

import CustomButton from "../../components/custom-button/custom-button.component";
import { addItemToCart, toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectProduct } from "../../redux/shop/shop.selector";

import "./product-information.styles.scss";

const ProductInformation = ({ product_data, addToCart, toggleCartHidden }) => {
  const product = product_data[0];

  const [currentImage, setCurrentImage] = useState(product.images[0]);

  const [imageCollection, setImageCollection] = useState(product.images);

  const [productVariants, setProductVariants] = useState({});

  const [quantity, setQuantity] = useState(1);

  const params = useParams();

  const handleSwitchChange = (event, variant) => {
    let variantObjAssign = Object.assign({}, ...product.variants);
    let optionsObjAssign = Object.assign({}, ...variantObjAssign[variant]);
    let optionsImages = optionsObjAssign[event.target.value];

    if (optionsImages.length > 0) {
      setImageCollection(optionsImages);
      setCurrentImage(optionsImages[0]);
    }

    setProductVariants({
      ...productVariants,
      [variant]: event.target.value,
    });
  };

  const handleAddToCart = () => {
    const cartItemToBeAdded = {
      brand: product.brand,
      title: product.title,
      sku: product.sku,
      price: product.price,
      variants: productVariants,
      quantity: quantity,
      imageUrl: currentImage,
    };
    addToCart(cartItemToBeAdded);
    toggleCartHidden();
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  });

  return (
    <div className="product-information">
      <div className="links">
        <Link to="/">Home</Link>/<Link to="/shop">Shop</Link>/
        <Link
          to={`/shop/${params.category}`}
          style={{ textTransform: "capitalize" }}
        >
          {params.category}
        </Link>
      </div>

      <div className="product-information__container">
        <div className="product-information__images">
          <div className="product-information__main">
            <Image publicId={currentImage} cloudName="ashwin808" />
          </div>
          <div className="product-information__grid">
            {imageCollection.map((image, index) => (
              <Image
                publicId={image}
                key={index}
                cloudName="ashwin808"
                onClick={() => setCurrentImage(image)}
              />
            ))}
          </div>
        </div>

        <div className="product-information__information">
          <h1>{product.brand + " " + product.title}</h1>
          <h3>{formatter.format(product.price)}</h3>
          <div
            dangerouslySetInnerHTML={{ __html: product.description }}
            className="product-information__description"
          />

          {product.variants
            ? product.variants.map((variant) => (
                <div className="product-information__select" key={variant}>
                  <label htmlFor={Object.keys(variant)[0]}>
                    {Object.keys(variant)[0]}
                  </label>
                  <select
                    name={Object.keys(variant)[0]}
                    id=""
                    onChange={(event) =>
                      handleSwitchChange(event, Object.keys(variant)[0])
                    }
                  >
                    <option disabled selected value> -- select an option -- </option>
                    {Object.values(variant).map((obj) => {
                      console.log("variant obj ", obj);
                      return obj.map((item, index) => (
                        <option key={index}>{Object.keys(item)[0]}</option>
                      ));
                    })}
                  </select>
                </div>
              ))
            : null}
          <div className="product-information__quantity">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <CustomButton toggle={() => handleAddToCart()}>
              ADD TO CART
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  product_data: selectProduct(props.match.params.product)(state),
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (cartItem) => dispatch(addItemToCart(cartItem)),
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductInformation);
