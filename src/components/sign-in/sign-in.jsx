import { Button } from "@material-ui/core";
import React from "react";

const SignIn = ({ onClick, children }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      {children}
    </Button>
  );
};

export default SignIn;
