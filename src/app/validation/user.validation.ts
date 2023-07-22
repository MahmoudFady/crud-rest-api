import Joi from "joi";
import userModel from "../models/user.model";
import modelOptionsUtil from "../utils/get-model-options.util";
import joiSchemaGenerator from "../utils/joi-schema-genrator";
const userOptions = modelOptionsUtil(userModel);
const addUser = joiSchemaGenerator(userOptions);
const updateUser = addUser.fork(Object.keys(addUser.describe().keys), (field) =>
  field.optional()
);

export { addUser, updateUser };
