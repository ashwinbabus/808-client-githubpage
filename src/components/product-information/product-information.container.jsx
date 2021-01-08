import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsDataFetched } from "../../redux/shop/shop.selector";
import ProductInformation from "./product-information.component";
import WithLoader from "../withLoader/withLoader.component";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsDataFetched(state),
});

const ProductInformationContainer = compose(
  connect(mapStateToProps),
  WithLoader
)(ProductInformation);

export default ProductInformationContainer;