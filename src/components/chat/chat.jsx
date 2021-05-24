import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import SignIn from "../sign-in/sign-in";
import Channel from "../channel/channel";

firebase.initializeApp({
  apiKey: "AIzaSyDjF4AZOkQCe84idB_9Uq5EXi_ppdmRVJI",
  authDomain: "login-form-515ab.firebaseapp.com",
  projectId: "login-form-515ab",
  storageBucket: "login-form-515ab.appspot.com",
  messagingSenderId: "915832270541",
  appId: "1:915832270541:web:8eb95a8f204f39e43bc384",
});

const auth = firebase.auth();
const db = firebase.firestore();

const Chat = () => {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    // clean subscription whenever our component unmount
    return unsubscribe;
  }, [initializing]);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  if (initializing) return "Loading...";

  return (
    <div>
      {user ? (
        <div>
          <SignIn onClick={signOut}>Sign Out</SignIn>
          <Channel db={db} />
        </div>
      ) : (
        <SignIn onClick={signInWithGoogle}>Sign in with google</SignIn>
      )}
    </div>
  );
};

export default Chat;
