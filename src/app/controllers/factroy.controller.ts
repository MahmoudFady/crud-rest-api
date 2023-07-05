import { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";
import resUtil from "../utils/response.util";
import ApiError from "../utils/error.util";
import * as fileUtil from "../utils/file.util";
class ControllerFactroy<T extends Document | any> {
  private successMsg = "data fetched successfully";
  private noDataMsg = "this data doesn't exist";
  constructor(private Model: Model<T>) {
    this.Model = Model;
  }
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.file)
        req.body["image"] = fileUtil.getUploadedFilePath(req, req.url);
      const user = await new this.Model(req.body).save();
      resUtil(res, "OK", "created", { user });
    } catch (err) {
      next(new ApiError(err.message, err.statusCode));
    }
  };
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.Model.find();
      resUtil(res, "OK", this.successMsg, { data });
    } catch (err) {
      next(new ApiError(err));
    }
  };
  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.Model.findById(req.params.id);
      if (!data) resUtil(res, "NOT_FOUND", this.noDataMsg);
      resUtil(res, "OK", this.successMsg, { data });
    } catch (err) {
      next(new ApiError(err.message));
    }
  };
  updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.Model.findByIdAndUpdate(req.params.id, req.body);
      if (!data) resUtil(res, "NOT_FOUND", this.noDataMsg);
      resUtil(res, "OK", this.successMsg);
    } catch (err) {
      next(new ApiError(err.message));
    }
  };
  deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.Model.findByIdAndDelete(req.params.id);
      if (!result) resUtil(res, "NOT_FOUND", this.noDataMsg);
      resUtil(res, "OK", this.successMsg);
    } catch (err) {
      next(new ApiError(err.message));
    }
  };
}
export default ControllerFactroy;
