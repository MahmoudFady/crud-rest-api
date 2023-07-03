import userValidation from "./user.validation";
import * as shardValid from "./shared.vlaidation";
const joiSchmes = {
  user: userValidation,
  mongoId: shardValid.mongoIdSchema,
  file: shardValid.fileSchema,
};
export default (joiSchema: "user" | "mongoId" | "file", target: any) => {
  return joiSchmes[joiSchema].validate(target);
};
