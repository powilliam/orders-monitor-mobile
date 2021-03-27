import * as yup from "yup";

export const schema = yup.object().shape({
  hash: yup.string().required(),
  identifier: yup.string().required(),
});
