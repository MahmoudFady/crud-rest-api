import Entity from "../src/lib/Entity";
import userEntity from "./seeds";
describe("check entity.withName return type", () => {
  it("check return type and name", () => {
    expect(userEntity).toBeInstanceOf(Entity);
    expect(userEntity.getName()).toBe("usersTest");
  });
});
describe("check attributes after setting", () => {
  expect(userEntity.getAttributes().length).toBe(2);
  expect(userEntity.getAttributes()[1]).toMatchObject({
    name: "password",
    type: String,
    control: "input",
    controlType: "password",
    label: "plz enter password",
    isAttributeRequired: true,
    joiValidationConfigs: { min: 6, max: 15 },
  });
});
