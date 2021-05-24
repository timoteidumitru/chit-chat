import { useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import { db } from "../config/firebase";
import { Button } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { initialValues, validationSchema } from "./channel.form";
import { TextField } from "formik-material-ui";
import { StyledChat } from "./channel.style";

const Channel = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("messages")
        .orderBy("createdAt")
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
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
        name: "user",
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
            <li key={key}>
              {message.name}: {message.text}
            </li>
          ))}
        </StyledChat>
      }
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {({ isValid }) => (
          <Form onSubmit={handleSubmit} onChange={handleChange}>
            <Field
              component={TextField}
              type="text"
              value={newMessage}
              name="text"
              id="text"
              label="Add a message"
              refs={inputRef}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isValid}
            >
              send
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default Channel;
