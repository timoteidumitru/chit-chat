import React from "react";
import { ButtonWrapper } from "./sign-in.style";

const SignIn = ({ onClick, children }) => {
  return (
    <ButtonWrapper variant="contained" color="primary" onClick={onClick}>
      {children}
    </ButtonWrapper>
  );
};

export default SignIn;
