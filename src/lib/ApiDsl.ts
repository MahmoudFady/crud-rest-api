import express, { Express } from "express";
import Entity from "./Entity";
import ApiGenerator from "./ApiGenerator";
export class ApiDsl {
  private constructor(private expressApp: Express) {}
  static get() {
    const expressApp = express();
    expressApp.use(express.urlencoded({ extended: true }));
    expressApp.use(express.json());
    return new ApiDsl(expressApp);
  }
  listen(port: number) {
    console.log("server is running ", port);
    this.expressApp.listen(port);
    return this;
  }
  registerEntity(func: (ec: EntityConfigurer) => EntityConfigurer) {
    let ec = func(EntityConfigurer.get());
    const routes = ApiGenerator.generate(ec.getEntity());
    this.expressApp.use(ec.getBaseUrl(), routes);
    return this;
  }
  getExpressApp() {
    return this.expressApp;
  }
}
export class EntityConfigurer {
  private entity: Entity;
  private baseUrl: string;
  static get() {
    let ec = new EntityConfigurer();
    return ec;
  }
  ofEntity(entity: Entity) {
    this.entity = entity;
    return this;
  }
  withBaseUrl(url: string) {
    this.baseUrl = url;
    return this;
  }
  getEntity() {
    return this.entity;
  }
  getBaseUrl() {
    return this.baseUrl;
  }
}
