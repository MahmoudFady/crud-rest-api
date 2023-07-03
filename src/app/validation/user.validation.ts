import Joi from "joi";
import { fileSchema } from "./shared.vlaidation";
export default Joi.object({
  image: fileSchema.optional(),
  firstName: Joi.string()
    .min(3)
    .max(9)
    .pattern(/^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/)
    .required(),
  middleName: Joi.string()
    .min(3)
    .max(9)
    .pattern(/^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/)
    .required(),
  thirdName: Joi.string()
    .min(3)
    .max(9)
    .pattern(/^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/)
    .required(),
  email: Joi.string().email().required(),
  ssn: Joi.number().custom((val) => {
    if (new String(val).length === 14) return val;
    throw "ssn must be number of 14 digits";
  }),
  birthDate: Joi.date()
    .required()
    .custom((val) => {
      if (val < new Date()) return val;
      throw "birth date must be older";
    }),
  address: Joi.string().min(10).required(),
  gender: Joi.string().valid("male", "female").required(),
});
