import { Button } from "@material-ui/core";
import { Form } from "formik";
import styled from "styled-components";
export const FormWrapper = styled(Form)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: auto;
  /* grid-column: 2/-2; */
  /* margin: 0 auto; */
  grid-gap: 1rem;
  /* padding-left: 90px; */
`;

export const ButtonWrapper = styled(Button)`
  height: 50px;
  width: 100px;
  border-radius: 10px;
  display: flex;
  font-size: 16px;
  text-transform: capitalize;
  justify-content: center;
  align-items: center;
  color: white;
  /* transition: ease-out 0.5s; */
  background-color: #3f51b5;
  /* grid-column: 1/-1; */
`;
