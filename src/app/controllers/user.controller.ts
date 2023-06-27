import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/error.util";
import * as fileUtil from "../utils/file.util";
import path from "path";
import fs from "fs";
import userModel from "../models/user.model";
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
    res.status(200).json({ message: "user added", data: { user } });
  } catch (err) {
    next(new ApiError(err.message, err.statusCode));
  }
};
