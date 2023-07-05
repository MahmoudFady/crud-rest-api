import { Response } from "express";
import httpResStatus from "../types/http-status-code.type";
import httpStatusCode from "../config/http-status-code.config";
export default (
  res: Response,
  status: httpResStatus,
  message: string,
  result: { [key: string]: any } = null
) => {
  const statusCode = httpStatusCode[status];
  return res.status(statusCode).json({ message, result });
};