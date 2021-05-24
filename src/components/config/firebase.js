import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const FirebaseConfig = {
  apiKey: "AIzaSyDjF4AZOkQCe84idB_9Uq5EXi_ppdmRVJI",
  authDomain: "login-form-515ab.firebaseapp.com",
  projectId: "login-form-515ab",
  storageBucket: "login-form-515ab.appspot.com",
  messagingSenderId: "915832270541",
  appId: "1:915832270541:web:8eb95a8f204f39e43bc384",
};

firebase.initializeApp(FirebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
