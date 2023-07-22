import Joi from "joi";
export default (fields: { [key: string]: any }[]) => {
  let JoiSchema: { [key: string]: any } = {};
  for (let { options, name, type } of fields) {
    let fieldSchema = Joi[type]().required();
    if (options.controlType === "email") {
      fieldSchema = fieldSchema.email();
    }
    if (options.validation) {
      for (let k in options.validation) {
        if (typeof fieldSchema[k] === "function") {
          if (k === "valid") {
            fieldSchema = fieldSchema.valid(...options.validation[k]);
          } else {
            fieldSchema = fieldSchema[k](options.validation[k]);
          }
        }
      }
    }

    JoiSchema[name] = fieldSchema;
  }

  return Joi.object(JoiSchema);
};
