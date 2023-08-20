import { ApiDsl } from "./ApiDsl";
import Attibute from "./Attribute";
import Entity from "./Entity";
import DbConnectionFactory from "./DataBaseConnectionFactory";
const testApi = async () => {
  const userEntity = Entity.withName("UserEx")
    .addAttribute(
      Attibute.get()
        .withName("userName")
        .withType(String)
        .withControl("input")
        .withControlType("text")
        .withPlaceholder("ex : ali")
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
        .withPlaceholder("mzx!23")
        .withLabel("plz enter password")
        .required()
        .joiValidation({ min: 6, max: 15 })
    );
  const postEntity = Entity.withName("post").addAttribute(
    Attibute.get()
      .withName("postTitle")
      .withType(String)
      .withControl("input")
      .withControlType("text")
      .withPlaceholder("ex : ali")
      .withLabel("plz enter username")
      .required()
      .unique()
  );
  await DbConnectionFactory.connect(
    "mongodb+srv://crud-team:IW8fhf8nAgfZQGsi@cluster0.dujk0xo.mongodb.net/?retryWrites=true&w=majority"
  );
  const orderEntity = Entity.withName("order").addAttribute(
    Attibute.get().withName("name").withType(String)
  );
  const app = ApiDsl.get()
    .listen(9090)
    .registerEntity((ec) => {
      return ec.ofEntity(userEntity).withBaseUrl("/userEx");
    });
  app.registerEntity((ec) => {
    return ec.ofEntity(postEntity).withBaseUrl("/postEx");
  });
};
export default testApi;
