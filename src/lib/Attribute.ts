import { ValidatorProps } from "mongoose";

export default class Attibute {
  private name: string;
  private type: any;
  private label: string;
  private control: string;
  private controlType: string;
  private placeholder: string;
  private isAttributeUnique = false;
  private isAttributeRequired = false;
  private default = null;
  private mongooseValidator: (val: any) => boolean;
  private errorMessageProvider: (obj: ValidatorProps) => string;
  private joiValidationConfigs: { [k: string]: any } = {};
  private constructor() {}
  static get() {
    return new Attibute();
  }
  withName(name: string) {
    this.name = name;
    return this;
  }
  withType(type: any) {
    this.type = type;
    return this;
  }
  withLabel(label: string) {
    this.label = label;
    return this;
  }
  withControl(control: string) {
    this.control = control;
    return this;
  }
  withControlType(controlType: string) {
    this.controlType = controlType;
    return this;
  }
  withPlaceholder(val: string) {
    this.placeholder = val;
    return this;
  }
  required() {
    this.isAttributeRequired = true;
    return this;
  }
  unique() {
    this.isAttributeUnique = true;
    return this;
  }
  defaultValue(val: any) {
    this.default = val;
    return this;
  }
  mongooseValidatorFun(fun: (value: any) => boolean) {
    this.mongooseValidator = fun;
    return this;
  }
  generateValidationErrorMsg(fun: (obj: ValidatorProps) => string) {
    this.errorMessageProvider = fun;
    return this;
  }
  joiValidation(obj: object) {
    this.joiValidationConfigs = obj;
    return this;
  }
  getName(): string {
    return this.name;
  }

  getType(): any {
    return this.type;
  }

  getLabel(): string {
    return this.label;
  }

  getControl(): string {
    return this.control;
  }

  getControlType(): string {
    return this.controlType;
  }
  getPlaceholder(): string {
    return this.placeholder;
  }
  isUnique(): boolean {
    return this.isAttributeUnique;
  }

  isRequired(): boolean {
    return this.isAttributeRequired;
  }

  getDefault(): any {
    return this.default;
  }

  getMongooseValidator(): (val: any) => boolean {
    return this.mongooseValidator;
  }

  getErrorMessageProvider(): (obj: ValidatorProps) => string {
    return this.errorMessageProvider;
  }

  getJoiValidationConfigs(): object {
    return this.joiValidationConfigs;
  }
}
