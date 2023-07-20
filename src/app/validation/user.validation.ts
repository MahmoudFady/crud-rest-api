import Joi from "joi";
import { fileSchema } from "./shared.vlaidation";
import * as validUtil from "../utils/validate.util";
const addUser = Joi.object({
  image: fileSchema.optional(),
  firstName: Joi.custom((val) => validUtil.validateString(val)),
  middleName: Joi.custom((val) => validUtil.validateString(val)),
  thirdName: Joi.custom((val) => validUtil.validateString(val)),
  email: Joi.string().email().required(),
  ssn: Joi.number().custom((val) => {
    if (new String(val).length === 14) return val;
    throw "ssn must be a number of 14 digits";
  }),
  birthDate: Joi.date()
    .required()
    .custom((val) => {
      if (val < new Date()) return val;
      throw "birth date must be older";
    }),
  address: Joi.custom((val) => validUtil.validateString(val, { min: 10 })),
  gender: Joi.string().valid("male", "female").required(),
});
const updateUser = addUser.fork(Object.keys(addUser.describe().keys), (field) =>
  field.optional()
);
export { addUser, updateUser };
