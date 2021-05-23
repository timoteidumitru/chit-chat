import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import SignIn from "../sign-in/sign-in";
import Channel from "../channel/channel";

firebase.initializeApp({
  apiKey: "AIzaSyCTB3f3H338gvZ7fecRZiaDc7klhUh0H_I",
  authDomain: "chitchat-8b693.firebaseapp.com",
  projectId: "chitchat-8b693",
  storageBucket: "chitchat-8b693.appspot.com",
  messagingSenderId: "789495693908",
  appId: "1:789495693908:web:85fcecbaf89dd1de1323c1",
  measurementId: "G-5F69ZXDRP0",
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
          <Channel user={user} db={db} />
        </div>
      ) : (
        <SignIn onClick={signInWithGoogle}>Sign in with google</SignIn>
      )}
    </div>
  );
};

export default Chat;
