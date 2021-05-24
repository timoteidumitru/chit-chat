import React from "react";
import { formatRelative } from "date-fns";

const Message = ({
  createdAt = null,
  text = "",
  displayName = "",
  photoURL = "",
}) => {
  return (
    <div>
      {photoURL ? (
        <img src={photoURL} alt="avatar" width={45} height={45} />
      ) : null}
      {displayName ? <p>{displayName}</p> : null}
      {text ? <p>{text}</p> : null}
      {createdAt?.seconds ? (
        <span>
          {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
        </span>
      ) : null}
    </div>
  );
};

export default Message;
