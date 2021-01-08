import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import {selectIsDataFetching} from '../../redux/shop/shop.selector';
import ProductCollection from './product-collection.component';
import WithLoader from '../withLoader/withLoader.component';

const mapStateToProps = createStructuredSelector({
    isLoading : state => selectIsDataFetching(state)
});

const ProductCollectionContainer = compose(
    connect(mapStateToProps),
    WithLoader
)(ProductCollection);

export default ProductCollectionContainer;