import joi from "joi";
import { commonFieldValidation } from "../../../middleware/validation.middleware.js";

export const signupSchema = {
  query: joi.object({}).keys({
    ln: joi.string().valid("ar", "en", "fr").required(),
  }),
  body: joi
    .object({})
    .keys({
      userName: commonFieldValidation.userName.required(),
      email: commonFieldValidation.email.required(),
      password: commonFieldValidation.password.required(),
      confirmPassword: joi.string().valid(joi.ref("password")).required(),
      phone: commonFieldValidation.phone,
      DOB: commonFieldValidation.DOB,
      gender: commonFieldValidation.gender,
    })
    .required(),
};
export const loginSchema = {
  body: joi
    .object({
     
      email: commonFieldValidation.email.required(),
      password: commonFieldValidation.password.required(),
    })
    .xor("email", "userName")
    .messages({
      "object.missing": "you must enter one of them only 'userName' or 'email'",
    }),
};
