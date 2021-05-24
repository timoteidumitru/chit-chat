import { useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import { db } from "../config/firebase";
import { Field, Form, Formik } from "formik";
import { initialValues, validationSchema } from "./channel.form";
import { TextField } from "formik-material-ui";
import { StyledChat, List } from "./channel.style";
import Message from "../message/message";
import { ButtonWrapper } from "../sign-in/sign-in.style";

const Channel = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const inputRef = useRef();

  const { uid, displayName, photoURL } = user;

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
          // update state
          setMessages(data);
        });
      return unsubscribe;
    }
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    if (db) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
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
            </List>
          ))}
        </StyledChat>
      }
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {({ isValid }) => (
          <Form onSubmit={handleSubmit} onChange={handleChange} ref={inputRef}>
            <Field
              component={TextField}
              type="text"
              value={newMessage}
              name="text"
              id="text"
              ref={inputRef}
              label="Add a message"
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
          </Form>
        )}
      </Formik>
    </>
  );
};
export default Channel;
