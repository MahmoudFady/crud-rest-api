import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/error.util";
import * as fileUtil from "../utils/file.util";
import { resHandler } from "../utils/helper";
import path from "path";
import fs from "fs";
import userModel from "../models/user.model";
export const updateImage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const imagePath = fileUtil.getUploadedFilePath(req, "users");
    const data = await userModel.findByIdAndUpdate(req.params["userId"], {
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

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getUsers = await userModel.find({})
    if (!getUsers) throw new ApiError("user not found", 404)
    res.send(getUsers);
  } catch (err) {
    next(new ApiError(err.message, err.statusCode));
  }
}

export const getOneUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params
    if (userId) {
      const getUser = await userModel.findOne({ _id: userId })
      if (!getUser) throw new ApiError("user not found", 404)
      res.send(getUser);
    }
  } catch (err) {
    next(new ApiError(err.message, err.statusCode));
  }
}

  export const editUser = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const user = await userModel.findOneAndUpdate({ _id: req.params.id }, {...req.body })
        if (!user) throw new ApiError("user does not exist", 404);
        resHandler(res, 200, true, " ", "data updated")
    } catch (err) {
        next(new ApiError(err.message, err.statusCode));
    }
}

export const deleteUser = async(req:Request, res:Response, next:NextFunction) => {
  try {
      const user = await userModel.deleteOne({ _id: req.params.id })
      if (!user) throw new ApiError("user does not exist", 404);
      resHandler(res, 200, true, " ", "user deleted")
  } catch (err) {
      next(new ApiError(err.message, err.statusCode));
  }
}
