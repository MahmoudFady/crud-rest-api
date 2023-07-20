import { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";
import resUtil from "../utils/response.util";
import ApiError from "../utils/error.util";
import ServiceFactory from "../services/factory.service";
class ControllerFactroy<T extends Document | any> {
  private successMsg = "data fetched successfully";
  private noDataMsg = "data doesn't exist";
  serviceFactory: ServiceFactory<T>;
  constructor(private Model: Model<T>) {
    this.serviceFactory = new ServiceFactory(this.Model);
  }
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.serviceFactory.create(req.body);
      resUtil(req, res, "OK", "created", { data });
      res.status(200).json({ message: "saved" });
    } catch (err) {
      next(new ApiError(err.message, err.statusCode));
    }
  };
  getAll =
    (projection = "") =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await this.serviceFactory.getAll(projection);
        resUtil(req, res, "OK", this.successMsg, { data });
      } catch (err) {
        next(new ApiError(err));
      }
    };
  getById =
    (paramName: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await this.serviceFactory.getById(req.params[paramName]);
        if (!data) resUtil(req, res, "NOT_FOUND", this.noDataMsg);
        resUtil(req, res, "OK", this.successMsg, { data });
      } catch (err) {
        next(new ApiError(err.message));
      }
    };
  updateById =
    (paramName: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await this.serviceFactory.updateById(
          req.params[paramName],
          req.body
        );
        if (!data) resUtil(req, res, "NOT_FOUND", this.noDataMsg);
        resUtil(req, res, "OK", "data updated successfully", {
          data: req.body,
        });
      } catch (err) {
        next(new ApiError(err.message));
      }
    };
  deleteById =
    (paramName: string) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await this.serviceFactory.deleteById(
          req.params[paramName]
        );
        if (!result) resUtil(req, res, "NOT_FOUND", this.noDataMsg);
        resUtil(req, res, "OK", "data deleted successfully");
      } catch (err) {
        next(new ApiError(err.message));
      }
    };
  getModelFields = () => {
    const schemaPaths = this.Model.schema.paths;
    const attributes = [];
    for (const path in schemaPaths) {
      if (schemaPaths.hasOwnProperty(path) && path != "_id" && path !== "__v") {
        attributes.push({
          name: path,
          type: schemaPaths[path].instance,
          options: this.Model.schema.obj[path]?.options,
        });
      }
    }
    return attributes;
  };
  getOptions = (req: Request, res: Response, next: NextFunction) => {
    const attributes = this.getModelFields();
    resUtil(req, res, "OK", "entity options", { attributes });
  };
  getFormTemplate = (req: Request, res: Response, next: NextFunction) => {
    const fields = req.query.fields as string[];
    const attributes = fields
      ? this.getModelFields().filter((field) => {
          return fields.includes(field.name);
        })
      : this.getModelFields();
    resUtil(req, res, "OK", "entity template form", { fields: attributes });
  };
}
export default ControllerFactroy;
