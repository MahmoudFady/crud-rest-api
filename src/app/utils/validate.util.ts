import * as fieldValidConfig from "../config/field-validation.config";
const validateString = (
  val: string,
  target: { min?: number; max?: number; require?: Boolean; regex?: RegExp } = {}
) => {
  const criteria = {
    ...fieldValidConfig.stringCriteria,
    ...target,
  };
  if (val.length < criteria.min) throw "filed min length " + criteria.min;
  if (val.length > criteria.max) throw "filed max length " + criteria.max;
  else if (!criteria.regex.test(val)) throw "filed is invalid";
  return val;
};
export { validateString };
