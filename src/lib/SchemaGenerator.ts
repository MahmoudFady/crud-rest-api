import mongoose, { Schema } from "mongoose";
import optionsGeneratorUtil from "../app/utils/options-generator.util";
import Entity from "./Entity";
export default class SchemaGenerator {
  static generate(entity: Entity) {
    const schemaAattributes = {};
    entity.getAttributes().forEach((attribute) => {
      schemaAattributes[attribute.getName()] = {
        type: attribute.getType(),
        defualt: attribute.getDefault(),
        unique: attribute.isUnique(),
        required: attribute.isRequired(),
        options: optionsGeneratorUtil(attribute.getLabel(), {
          control: attribute.getControl(),
          controlType: attribute.getControlType(),
          required: attribute.isRequired(),
          validation: attribute.getJoiValidationConfigs(),
          placeholder: attribute.getPlaceholder(),
        }),
      };
      if (
        attribute.getMongooseValidator() &&
        attribute.getErrorMessageProvider()
      ) {
        schemaAattributes[attribute.getName()]["validate"] = {
          validator: attribute.getMongooseValidator(),
          message: attribute.getErrorMessageProvider(),
        };
      }
    });
    return new Schema(schemaAattributes);
  }
  static generateCollectionFromSchema(entity: Entity, schema: mongoose.Schema) {
    return mongoose.model(entity.getName(), schema);
  }
}
