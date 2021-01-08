import { takeLatest, put, all, call } from "redux-saga/effects";
import { getUserOrders } from "../api";

import OrdersActionTypes from "./orders.action-types";
import {
  fetchUserOrdersFailure,
  fetchUserOrdersSuccess,
} from "./orders.actions";

function* ordersFetchSaga({ payload }) {
  try {
    const orders = yield getUserOrders(payload);
    yield put(fetchUserOrdersSuccess(orders));
  } catch (error) {
    yield put(fetchUserOrdersFailure(error));
  }
}

function* onOrdersFetchStart() {
  yield takeLatest(OrdersActionTypes.FETCH_USER_ORDERS_START, ordersFetchSaga);
}

export function* ordersSagas() {
  yield all([call(onOrdersFetchStart)]);
}
