import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import userModel from "../models/user.model";
import ApiError from "../utils/error.util";
import resUtil from "../utils/response.util";
import * as fileUtil from "../utils/file.util";
export const updateImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const imagePath = fileUtil.getUploadedFilePath(req, "users");
    const data = await userModel
      .findByIdAndUpdate(req.params["userId"], {
        $set: { image: imagePath },
      })
      .select("image");
    if (!data) throw new ApiError("user does not exist", 404);
    fs.unlinkSync(
      path.join(__dirname, "../../uploads/users", path.basename(data.image))
    );
    res
      .status(200)
      .json({ message: "user image updated", data: { image: imagePath } });
  } catch (err) {
    next(new ApiError(err.message, err.statusCode));
  }
};
export const addOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { ssn, email } = req.body;
    const usersList = await userModel.find({ $or: [{ ssn }, { email }] });
    if (usersList.length > 0) throw new ApiError("user already exist", 409);
    req.body["image"] = fileUtil.getUploadedFilePath(req, "users");
    const user = await new userModel(req.body).save();
    resUtil(res, "OK", "created", { user });
  } catch (err) {
    next(new ApiError(err.message, err.statusCode));
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.find({});
    resUtil(res, "OK", "users are founed", { users });
  } catch (err) {
    next(new ApiError(err.message, err.statusCode));
  }
};

export const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId);
    if (!user) resUtil(res, "NOT_FOUND", "user does not exist");
    resUtil(res, "OK", "user founed ", { user });
  } catch (err) {
    next(new ApiError(err.message));
  }
};

export const editUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { _id: req.params.userId },
      req.body
    );
    if (!user) resUtil(res, "NOT_FOUND", "user does not exist");
    resUtil(res, "OK", "updated");
  } catch (err) {
    next(new ApiError(err.message));
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await userModel.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0)
      resUtil(res, "NOT_FOUND", "user does not exist");
    resUtil(res, "OK", "user deleted");
  } catch (err) {
    next(new ApiError(err.message));
  }
};
