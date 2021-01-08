import { takeLatest, put, all, call } from "redux-saga/effects";

// import UserActionTypes from './user.types';

import UserActionTypes from './user.action-types';

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from "./user.actions";

import {
  auth,
  googleProvider,
} from "../../firebase/firebase";
import { getUserFromMongo, saveUserToMongo } from "../api";


export function* getUserFromMongoSaga(firebase_uid){
  const user = yield getUserFromMongo(firebase_uid);
  yield put(signInSuccess(user));
}

export function* saveUserToMongoSaga(firebase_uid,displayName,email){
  const user = yield saveUserToMongo({firebase_uid,displayName,email});
  console.log("user received ",user);
    yield put(signInSuccess(user))
}


export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    const {uid,displayName,email} = user;
    yield saveUserToMongoSaga(uid,displayName,email);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
       const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getUserFromMongoSaga(user.uid);
  } catch (error) {
    yield put(signInFailure(error));
  }
}


export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({firebase_uid:user.uid,email:user.email,displayName}))
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* checkUser({payload}){
  yield getUserFromMongoSaga(payload);
}

export function* onCheckUserSession(){
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION,checkUser)
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN, signInWithEmail);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, saveUserToMongoSaga);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onCheckUserSession)
  ]);
}
