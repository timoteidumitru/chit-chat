import { useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import { db } from "../config/firebase";
import { Formik } from "formik";
import { initialValues, validationSchema } from "./channel.form";
import { StyledChat, List, TextInput } from "./channel.style";
import Message from "../message/message";
import { ButtonWrapper, FormWrapper } from "../sign-in/sign-in.style";
import "firebase/database";

const Channel = ({ user }) => {
  const inputRef = useRef();
  const focusRef = useRef();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { displayName, photoURL } = user;

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("messages")
        .orderBy("createdAt")
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          inputRef.current?.scrollIntoView();
          focusRef.current?.focus();
          // update state
          setMessages(data);
        });
      return unsubscribe;
    }
  }, []);

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    if (db) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        displayName,
        photoURL,
      });
      setNewMessage("");
    }
    return e.preventDefault();
  };

  return (
    <>
      {
        <StyledChat>
          {messages.map((message, key) => (
            <List key={key}>
              <Message {...message} />
              <button
                onClick={() =>
                  db.collection("messages").doc(message.id).delete()
                }
              >
                x
              </button>
            </List>
          ))}
        </StyledChat>
      }
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {({ isValid }) => (
          <FormWrapper onSubmit={handleSubmit}>
            <TextInput
              onChange={handleChange}
              type="text"
              value={newMessage}
              name="text"
              label="Add a message"
              ref={focusRef}
            />
            <ButtonWrapper
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isValid}
              size="large"
            >
              send
            </ButtonWrapper>
          </FormWrapper>
        )}
      </Formik>
      <div ref={inputRef} />
    </>
  );
};
export default Channel;
