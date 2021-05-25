import { Field } from "formik";
import styled from "styled-components";

export const StyledChat = styled.div`
  list-style: none;
  display: block;
`;

export const List = styled.div`
  list-style: none;
`;
export const TextInput = styled(Field)`
  height: 50px;
  width: 200px;
  & label {
    height: 10px;
    overflow: unset;
  }
`;
