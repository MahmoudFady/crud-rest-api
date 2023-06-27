import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/error.util";

export default (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  const { message, statusCode } = error;
  res.status(statusCode || 500).json({
    message,
  });
};
