import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/error.util";
import * as fileUtil from "../utils/file.util";
import * as userService from "../services/user.service";
export const updateImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const imagePath = fileUtil.getUploadedFilePath(req);
    const data = await userService.updateImage(req.params.id, imagePath);
    res
      .status(200)
      .json({ message: "user image updated", data: { image: data.image } });
  } catch (err) {
    next(new ApiError(err.message, err.statusCode));
  }
};
