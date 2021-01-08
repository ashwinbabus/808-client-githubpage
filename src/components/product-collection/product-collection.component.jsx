import React, { useState } from "react";

import Product from "../product/product.component";
import Pagination from "../pagination/pagination.component";

import "./product-collection.styles.scss";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { selectShopData } from "../../redux/shop/shop.selector";
import { createStructuredSelector } from "reselect";
import { useTrail , animated , config } from "react-spring";

const ProductCollection = ({ SHOP_DATA }) => {
  const { category } = useParams();
  if (category) {
    SHOP_DATA = SHOP_DATA.filter((product) => product["category"] === category);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = SHOP_DATA.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const trail = useTrail(currentProducts.length, {
    to: { opacity: 1 , height : '50%' },
    from: { opacity: 0 , height : '100%' },
    config: config.gentle,
  })

  return (
    <div className="collectionpage">
      <div className="collectionpage__grid">
        {trail.map((props,index) => {
          const item = currentProducts[index]
          return(
          <animated.div key={item.sku} style={props} >
            <Product item={item} />
          </animated.div>
        )})}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        noOfproducts={SHOP_DATA.length}
        paginate={paginate}
        className="collectionpage__pagination"
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  SHOP_DATA: selectShopData,
});

export default connect(mapStateToProps)(ProductCollection);
