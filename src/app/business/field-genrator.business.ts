import {
  numberCriteria,
  stringCriteria,
} from "../config/field-validation.config";
const validationCriteria = {
  text: stringCriteria,
  number: numberCriteria,
};
export default (
  label: string,
  options: {
    control?: string;
    controlType?: string;
    placehoalder: string;
    values?: string[];
    validation?: { [key: string]: any };
  }
) => {
  const fieldOptions = {
    label,
    control: "input",
    controlType: "text",
    ...options,
    validation: options.validation
      ? {
          ...validationCriteria[options.controlType || "text"],
          ...options.validation,
        }
      : validationCriteria[options.controlType || "text"],
  };
  return fieldOptions;
};
