import React from "react";

const SignIn = ({ onClick = null, children = null }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default SignIn;
