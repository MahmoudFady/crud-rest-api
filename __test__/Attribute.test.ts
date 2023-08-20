import { ValidatorProps } from "mongoose";
import Attribute from "../src/lib/Attribute";
let attribute = Attribute.get();
describe("first check the object type", () => {
  it("should to be instance of Attribute class", () => {
    expect(attribute).toBeInstanceOf(Attribute);
  });
});
describe("check return values before setting them", () => {
  it("should return attr name undefined", () => {
    expect(attribute.getType()).toBeUndefined();
    expect(attribute.getLabel()).toBeFalsy();
    expect(attribute.getControl()).toBeFalsy();
    expect(attribute.getControlType()).toBeFalsy();
    expect(attribute.getDefault()).toBeFalsy();
    expect(attribute.isRequired()).toBeFalsy();
    expect(attribute.isUnique()).toBeFalsy();
    expect(attribute.getErrorMessageProvider()).toBeFalsy();
    expect(attribute.getJoiValidationConfigs()).toEqual({});
    expect(attribute.getMongooseValidator()).toBeFalsy();
  });
});
let valuedAttr = Attribute.get().withName("email").withType(String);
describe("check name= email and type= String", () => {
  it("should return name = email , type String", () => {
    expect(valuedAttr.getName()).toBe("email");
    expect(valuedAttr.getType()).toBe(String);
  });
});
valuedAttr.withControl("input").withControlType("email");
describe("check control= input and controlType= email", () => {
  it("should return name = email , type String", () => {
    expect(valuedAttr.getControl()).toBe("input");
    expect(valuedAttr.getControlType()).toBe("email");
  });
});
valuedAttr.withLabel("please type your email");
describe("check attribute label = please type your email", () => {
  it("should return label = ", () => {
    expect(valuedAttr.getLabel()).toBe("please type your email");
  });
});
valuedAttr.required().unique();
describe("check control= input and controlType= email", () => {
  it("should return name = email , type String", () => {
    expect(valuedAttr.isRequired()).toBe(true);
    expect(valuedAttr.isUnique()).toBe(true);
  });
});
valuedAttr.mongooseValidatorFun((val: string) => {
  return val.endsWith(".com");
});
valuedAttr.generateValidationErrorMsg((obj: ValidatorProps) => {
  return obj.value + " should end wtih .com";
});
describe("check functions", () => {
  it("should return func ref", () => {
    expect(valuedAttr.getMongooseValidator()("m.com")).toBe(true);
    expect(
      valuedAttr.getErrorMessageProvider()({ value: "m.com", path: "email" })
    ).toBe("m.com should end wtih .com");
  });
});
valuedAttr.joiValidation({ min: 4, max: 15 });
describe("check joi validation", () => {
  it("should return { min: 4, max: 15 }", () => {
    expect(valuedAttr.getJoiValidationConfigs()).toEqual({ min: 4, max: 15 });
  });
});
