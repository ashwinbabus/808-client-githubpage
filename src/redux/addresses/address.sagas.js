import { takeLatest, put, all, call } from "redux-saga/effects";
import { postAddress, getAddresses, deleteAddress, editAddress } from "../api";
import AddressActionTypes from "./address.action-types";
import {
  deleteAddressFailure,
  deleteAddressSuccess,
  getAddressFailure,
  getAddressSuccess,
  postAddressFailure,
  postAddressSuccess,
  updateAddressFailure,
  updateAddressSuccess,
} from "./address.actions";

function* postAddressSaga({ payload }) {
  try {
    const userId = yield postAddress(payload);
    yield put(postAddressSuccess(userId));
  } catch (error) {
    yield put(postAddressFailure());
  }
}

function* onPostAddressStart() {
  yield takeLatest(AddressActionTypes.POST_ADDRESS_START, postAddressSaga);
}

function* getAddressesSaga({ payload }) {
  console.log("get address userId ", payload);
  try {
    const addresses = yield getAddresses(payload);
    yield put(getAddressSuccess(addresses));
  } catch (e) {
    yield put(getAddressFailure(e));
  }
}

function* onPostAddressSuccess() {
  yield takeLatest(AddressActionTypes.POST_ADDRESS_SUCCESS, getAddressesSaga);
}

function* onGetAddressStart() {
  yield takeLatest(AddressActionTypes.GET_ADDRESS_START, getAddressesSaga);
}

function* deleteAddressSaga({ payload }) {
  try {
    yield deleteAddress(payload);
    yield put(deleteAddressSuccess());
  } catch (error) {
    yield put(deleteAddressFailure(error));
  }
}

function* onDeleteAddressStart() {
  yield takeLatest(AddressActionTypes.DELETE_ADDRESS_START, deleteAddressSaga);
}

function* updateAddress({payload}){
  console.log("saga payload ",payload);
  try {
    yield editAddress(payload)
    yield put(updateAddressSuccess())
  } catch (error) {
    yield put(updateAddressFailure(error))
  }
}

function* onUpdateAddressStart(){
  yield takeLatest(AddressActionTypes.UPDATE_ADDRESS_START,updateAddress)
}

export function* addressSagas() {
  yield all([
    call(onGetAddressStart),
    call(onPostAddressStart),
    call(onPostAddressSuccess),
    call(onDeleteAddressStart),
    call(onUpdateAddressStart)
  ]);
}
