import { Button } from "@material-ui/core";
import styled from "styled-components";

export const ButtonWrapper = styled(Button)`
  height: 50px;
  width: 140px;
  && {
    border-radius: 8px;
    color: black;
    transition: ease-out 0.5s;
    background-color: #3f51b5;
    color: white;
    overflow: hidden;
    margin-left: 40px;
    margin-bottom: 50px;
  }
`;
