import { useEffect, useState } from "react";
import firebase from "firebase/app";
// const auth = firebase.auth();
// const db = firebase.firestore();

const Channel = ({ user = null, db = null }) => {
  // const Channel = ({ user = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { uid, displayName, photoUrl } = user;

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
        uid,
        displayName,
        photoUrl,
      });
    }
  };

  return (
    <>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.text}
            {message.number}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newMessage} onChange={handleChange} />
        <button type="submit" disabled={!newMessage}>
          send
        </button>
      </form>
    </>
  );
};
export default Channel;
