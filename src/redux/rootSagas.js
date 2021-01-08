import {all,call} from 'redux-saga/effects';

import {shopSagas} from './shop/shop.sagas';
import {userSagas} from './user/user.sagas';
import {ordersSagas} from './orders/orders.sagas';
import {imagesSagas} from './images/images.sagas';
import {addressSagas} from './addresses/address.sagas';

export default function* rootSaga(){
    yield all([ call(shopSagas) , call(userSagas) , call(ordersSagas) , call(imagesSagas) , call(addressSagas) ])
};