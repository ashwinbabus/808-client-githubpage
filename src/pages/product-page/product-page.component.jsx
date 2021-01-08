import React from "react";

import ProductInformationContainer from "../../components/product-information/product-information.container";

import "./product-page.styles.scss";

const ProductPage = ({match}) => (
  <div className="product-page">
    <ProductInformationContainer match={match}/>
  </div>
);

export default ProductPage;
