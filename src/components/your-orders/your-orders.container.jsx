import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import YourOrders from './your-orders.component';
import WithLoader from '../withLoader/withLoader.component';
import { selectOrdersLoading } from '../../redux/orders/orders.selectors';

const mapStateToProps = createStructuredSelector({
    isLoading : selectOrdersLoading
});

const YourOrdersContainer = compose(
    connect(mapStateToProps),
    WithLoader
)(YourOrders);

export default YourOrdersContainer;