import Attibute from "../src/lib/Attribute";
import Entity from "../src/lib/Entity";

let userEntity = Entity.withName("usersTest")
  .addAttribute(
    Attibute.get()
      .withName("userName")
      .withType(String)
      .withControl("input")
      .withControlType("text")
      .withLabel("plz enter username")
      .required()
      .unique()
  )
  .addAttribute(
    Attibute.get()
      .withName("password")
      .withType(String)
      .withControl("input")
      .withControlType("password")
      .withLabel("plz enter password")
      .required()
      .joiValidation({ min: 6, max: 15 })
  );
export default userEntity;
