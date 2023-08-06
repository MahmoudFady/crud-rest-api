import { Request, Response, NextFunction } from "express";
import responseUtil from "./response.util";
import assetModel from "../models/asset.model";

export async function getAssetMenu(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const assets = await assetModel
      .find({ roles: { $in: "admin" } })
      .select("assetsCodes -_id"); //  showToFront: true
    const accessCode = [];
    assets.forEach((item) => {
      accessCode.push(...item.assetsCodes);
    });
    return responseUtil(req, res, "OK", "get all access code for role", {
      accessCode,
    });
  } catch (error) {
    responseUtil(req, res, "UN_AUTH", `${error.message}`);
  }
}
