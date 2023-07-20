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
  getOptions = (req: Request, res: Response, next: NextFunction) => {
    const schemaPaths = this.Model.schema.paths;
    const attributes = {};
    for (const path in schemaPaths) {
      if (schemaPaths.hasOwnProperty(path)) {
        attributes[path] = {
          type: schemaPaths[path].instance,
          options: this.Model.schema.obj[path]?.options,
        };
      }
    }
    resUtil(req, res, "OK", "entity options", { attributes });
  };
}
export default ControllerFactroy;
