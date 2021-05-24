import { Button } from "@material-ui/core";
import styled from "styled-components";

export const ButtonWrapper = styled(Button)`
  height: 50px;
  width: 220px;
  && {
    border-radius: 30px;
    color: black;
    transition: ease-out 0.5s;
    border: 2px solid teal;
    background-color: teal;

    &:hover {
      border: 2px solid grey;
      background-color: grey;
      transition: ease-in 0.5s;
      color: black;
      cursor: pointer;
    }
  }
`;
