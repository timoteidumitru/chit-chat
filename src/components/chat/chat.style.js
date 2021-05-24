import { Typography } from "@material-ui/core";
import styled from "styled-components";

export const ChatWrapper = styled.div`
  background-color: beige;
  text-align: center;
  margin: 0 auto;
  height: 100%;
  display: block;
  padding-top: 20vh;
`;

export const Title = styled(Typography)`
  display: flex;
  padding-bottom: 10vh;
  justify-content: center;
  align-items: center;
  && {
    font-size: 30px;
  }
`;
