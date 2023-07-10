import { Request, Response, NextFunction, json } from "express";
import ApiError from "../utils/error.util";
import * as fileUtil from "../utils/file.util";
import * as userService from "../services/user.service";
import responseUtil from "../utils/response.util";
import fileUploadHandlerUtil from "../utils/file-upload-handler.util";
import path from "path";
import fs from "fs";
import userModel from "../models/user.model";
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body["image"] = fileUploadHandlerUtil(req, "filesystem");
    const data = await userService.create(req.body);
    responseUtil(res, "OK", "user created", { data });
  } catch (err) {
    next(new ApiError(err.message, err.statusCode));
  }
};
export const updateImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const imagePath = fileUploadHandlerUtil(req, "filesystem");
    const data = await userService.updateImage(
      req.params["id"],
      imagePath as string
    );
    if (!data) responseUtil(res, "NOT_FOUND", "user does not exist");
    responseUtil(res, "OK", "user image updated successfully", {
      data: { _id: data._id, image: imagePath },
    });
  } catch (err) {
    next(new ApiError(err.message, err.statusCode));
  }
};
