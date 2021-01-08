import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import YourAddresses from './your-addresses.component';
import WithLoader from '../withLoader/withLoader.component';
import {  selectIsAddressLoading } from '../../redux/addresses/address.selectors';

const mapStateToProps = createStructuredSelector({
    isLoading : selectIsAddressLoading
});

const YourAddressContainer = compose(
    connect(mapStateToProps),
    WithLoader
)(YourAddresses);

export default YourAddressContainer;