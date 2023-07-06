import { NextFunction } from "express";
import validation from "../validation/index.validation";
import ApiError from "../utils/error.util";

type JoiSchemes = "user" | "mongoId" | "file";

export default (next: NextFunction, ...input: [JoiSchemes, any][]) => {
  for (let [schema, target] of input) {
    const { error } = validation(schema, target);

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      throw new ApiError(errorMessage, 409);
    }
  }
  next();
};
