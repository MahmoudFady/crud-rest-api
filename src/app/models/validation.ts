const stringValidation = (
  label: string,
  fieldType: string = "input",
  criteria: { [key: string]: any } = {}
) => {
  const mainCriteria = {
    min: 5,
    max: 20,
    pattern: "/^[A-Za-z]+(?:[-s][A-Za-z]+)*$/i",
    ...criteria,
  };
  return { label, fieldType, validation: mainCriteria };
};
export { stringValidation };
