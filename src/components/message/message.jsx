import React from "react";
import { formatRelative } from "date-fns";
import { DataMessage, StyledMessage } from "./message.style";

const Message = ({
  createdAt = null,
  text = "",
  displayName = "",
  photoURL = "",
}) => {
  return (
    <StyledMessage>
      <div>
        {photoURL ? (
          <img src={photoURL} alt="avatar" width={45} height={45} />
        ) : null}
      </div>
      <DataMessage>
        {displayName ? <p>{displayName}</p> : null}
        {text ? <p>{text}</p> : null}
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
