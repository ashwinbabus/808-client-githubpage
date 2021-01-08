import firebase from "firebase";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyDcCfkg2Rq1Gu12TyTb8OsDOweImERm4vc",
  authDomain: "auth-development-71153.firebaseapp.com",
  projectId: "auth-development-71153",
  storageBucket: "auth-development-71153.appspot.com",
  messagingSenderId: "25829997425",
  appId: "1:25829997425:web:a464232d6d6dfb432514d0",
});

export const auth = app.auth();
export default app;

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ promt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
