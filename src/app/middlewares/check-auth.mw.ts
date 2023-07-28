// {userId : 1 , role : 'admin' }
import { Request, Response, NextFunction } from "express";
import responseUtil from "../utils/response.util";
// checkAuth(['admin' , 'teacher'] , ['','getUsers'])
export default (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.user = {
      role: "admin",
    };

    if (roles.includes(req.user.role)) next();
    else return responseUtil(req, res, "UN_AUTH", "resoure does not allowed");
  };
