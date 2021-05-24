import * as Yup from "yup";

export const initialValues = {
  text: "",
};

export const validationSchema = Yup.object().shape({
  text: Yup.string()
    .min(2, "add a meessage")
    .max(100, "too long")
    .required("Required Message"),
});
