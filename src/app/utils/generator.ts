export default (
  label: string,
  options: {
    control?: string;
    controlType?: string;
    placeholder: string;
    values?: string[];
    validation?: { [key: string]: any };
  }
) => {
  const fieldOptions = {
    label,
    control: "input",
    controlType: "text",
    ...options,
    validation: options.validation,
  };
  return fieldOptions;
};
