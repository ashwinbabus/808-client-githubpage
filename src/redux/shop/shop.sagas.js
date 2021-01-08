import { takeLatest, call, put, all } from "redux-saga/effects";

// import axios from "axios";

import {fetchData} from "../api";

import { fetchDataSuccess, fetchDataFailure } from "./shop.actions";

import ShopActions from "./shop.action-types";

export function* fetchDataAsync() {
  try {
    const SHOP_DATA = yield call(fetchData);
    yield put(fetchDataSuccess(SHOP_DATA));
  } catch (error) {
    yield put(fetchDataFailure(error));
  }
}

export function* fetchDataStart() {
  yield takeLatest(ShopActions.FETCH_DATA_START, fetchDataAsync);
}

export function* shopSagas() {
  yield all([call(fetchDataStart)]);
}
