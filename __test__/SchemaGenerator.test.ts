import mongoose from "mongoose";
import userEntity from "./seeds";
import SchemaGenerator from "../src/lib/SchemaGenerator";
let userSchema = SchemaGenerator.generate(userEntity);
describe("check return of generate", () => {
  it("should return mongoos.Schema", () => {
    expect(userSchema).toBeInstanceOf(mongoose.Schema);
  });
});
let userCollection = SchemaGenerator.generateCollectionFromSchema(
  userEntity,
  userSchema
);
console.log(userCollection.schema.paths.userName);
describe("check collection after generating", () => {
  it("should return true compare schema object", () => {
    expect(userCollection.schema).toEqual(userSchema);
  });
  it("should return true compare name", () => {
    expect(userCollection.modelName).toBe(userEntity.getName());
  });
  it("should return true compare schema paths", () => {
    expect(userCollection.schema.paths).toEqual(userSchema.paths);
  });
});
