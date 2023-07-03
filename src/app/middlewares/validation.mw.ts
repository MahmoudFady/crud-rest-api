import { NextFunction } from "express";
import validation from "../validation/index.validation";
import ApiError from "../utils/error.util";

type JoiSchemes = "user" | "mongoId" | "file";

export default (next: NextFunction, ...input: [JoiSchemes, any][]) => {
  for (let [schema, target] of input) {
    const result = validation(schema, target);
    if (result.error) throw new ApiError("invalid data", 409);
  }
  next();
};
