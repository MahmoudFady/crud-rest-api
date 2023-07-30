import { level } from "winston";
// {role : 'admin' }
import { Request, Response, NextFunction } from "express";
import urlModel from "../models/url.model";
// checkAuth(['admin' , 'teacher'] , ['','getUsers'])
const generatePopulateOptions = (depth: number) => {
  if (depth <= 0) {
    return null;
  }

  return {
    path: "parent",
    populate: generatePopulateOptions(depth - 1),
  };
};
export default () =>
  async (req: Request, res: Response, next: NextFunction) => {
    req.user = {
      role: "developer",
    };
    let cachedUsers: { [k: string]: any } = {};
    let url = req.baseUrl + (req.path == "/" ? "" : req.path);
    url = url.split("v1/")[1];
    let data = await urlModel
      .findOne({ url })
      .populate(generatePopulateOptions(url.split("/").length - 1));
    let pointer: any = data;
    console.log(pointer);
    let isAuth = false;

    do {
      if (
        pointer.roles.includes(req.user.role) &&
        pointer.methods.includes(req.method.toLowerCase())
      ) {
        isAuth = true;
      }
      pointer = pointer.parent;
    } while (pointer);
    // attach authorization meta data to request
    if (isAuth) return next();
    else res.status(409).json({ message: "resoure does not allowed" });
  };
