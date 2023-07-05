const validateString = (
  val: string,
  target: { min?: number; max?: number; require?: Boolean; regex?: RegExp }
) => {
  const criteria = {
    min: 3,
    max: 10,
    require: true,
    regex: new RegExp(/^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/),
  };
  for (let k in target) {
    criteria[k] = target[k];
  }
  console.log(val);
  if (val.length < criteria.min) throw "filed min length " + criteria.min;
  if (val.length > criteria.max) throw "filed max length " + criteria.max;
  else if (!criteria.regex.test(val)) throw "filed is invalid";
  return val;
};
export { validateString };
