import React, { useEffect } from "react";
import { Route } from "react-router-dom";

import Header from "../../components/header/header.component";
import ProductCollectionContainer from "../../components/product-collection/product-collection.container";
import ProductPage from "../product-page/product-page.component";
import { fetchDataStart } from "../../redux/shop/shop.actions";

import { connect } from "react-redux";

import {v4 as uuid } from 'uuid';

import "./shop.styles.scss";

export const Shop = ({ match, fetchDataStart }) => {
  useEffect(() => {
    let isMount = true;
    if (isMount) fetchDataStart();
    return () => {isMount = false}
  },[fetchDataStart]);

  return (
    <div className="shop-page-container">
      <Header background={true} />
      <Route
        exact
        path={`${match.path}/`}
        render={(props) => <ProductCollectionContainer  {...props} key={uuid()} /> }
      />
      <Route
        exact
        path={`${match.path}/:category`}
        render={(props) => <ProductCollectionContainer  {...props} key={uuid()} />} 
      />
      <Route
        path={`${match.path}/:category/:product`}
        component={ProductPage}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchDataStart: () => dispatch(fetchDataStart()),
});

export default connect(null, mapDispatchToProps)(Shop);
