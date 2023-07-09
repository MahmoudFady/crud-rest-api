import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/error.util";

export default (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message, statusCode } = error;
  console.log(error);
  res.status(500).json({
    message,
  });
};
