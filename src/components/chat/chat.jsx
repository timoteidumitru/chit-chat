import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import SignIn from "../sign-in/sign-in";
import Channel from "../channel/channel";
import { auth } from "../config/firebase";
import { GoogleProvider } from "../config/firebase";
import { ChatWrapper, Title } from "./chat.style";

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
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(GoogleProvider);
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
    <ChatWrapper>
      {user ? (
        <>
          <SignIn onClick={signOut}>Sign Out</SignIn>
          <Channel user={user} />
        </>
      ) : (
        <>
          <Title>Welcome to Chat React with Firebase</Title>
          <SignIn onClick={signInWithGoogle}>Sign in with google</SignIn>
        </>
      )}
    </ChatWrapper>
  );
};

export default Chat;
