import React from "react";
import { formatRelative } from "date-fns";
import {
  DataMessage,
  StyledMessage,
  MessageText,
  MessageName,
} from "./message.style";

const Message = ({ createdAt, text, displayName, photoURL }) => {
  return (
    <StyledMessage>
      <div>{photoURL ? <img src={photoURL} alt="avatar" /> : null}</div>
      <DataMessage>
        <MessageName>{displayName ? <p>{displayName}</p> : null}</MessageName>
        <MessageText>{text ? <p>{text}</p> : null}</MessageText>
        {createdAt?.seconds ? (
          <span>
            {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
          </span>
        ) : null}
      </DataMessage>
    </StyledMessage>
  );
};

export default Message;
