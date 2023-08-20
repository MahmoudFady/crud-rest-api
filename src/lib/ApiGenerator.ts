import Entity from "./Entity";
import SchemaGenerator from "./SchemaGenerator";
import ControllerFactory from "../app/controllers/factory.controller";
import { Router } from "express";
import roleAuthMw from "../app/middlewares/role-auth.mw";
export default class ApiGenerator {
  static generate(entity: Entity): Router {
    const schema = SchemaGenerator.generate(entity);
    const collection = SchemaGenerator.generateCollectionFromSchema(
      entity,
      schema
    );
    let ctrlFactory = new ControllerFactory(collection);
    return this.generateRoutes(ctrlFactory);
  }
  private static generateRoutes(controllerFactory: ControllerFactory<any>) {
    const router = Router();
    router.post("/", controllerFactory.create);
    router.post("/search", controllerFactory.search());
    router.get("/options", controllerFactory.getOptions);
    router
      .route("/:id")
      .patch(controllerFactory.updateById("id"))
      .delete(controllerFactory.deleteById("id"));
    return router;
  }
}
