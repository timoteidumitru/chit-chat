import { useEffect, useState } from "react";
import firebase from "firebase/app";

const Channel = ({ db }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("messages")
        .orderBy("createdAt")
        .limit(100)
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
  }, [db]);

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (db) {
      db.collection("messages").add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  return (
    <>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.text}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
        <button type="submit" disabled={!newMessage}>
          send
        </button>
      </form>
    </>
  );
};
export default Channel;
