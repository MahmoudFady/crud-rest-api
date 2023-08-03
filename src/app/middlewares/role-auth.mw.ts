import { Request, Response, NextFunction } from "express";
import urlModel from "../models/asset.model";
import ApiError from "../utils/error.util";
import {verifyUser} from '../utils/verfy-user.util';
import { JwtPayload } from "jsonwebtoken";
import { getAssetMenu } from "../utils/get-asset-menu.util";


export default async (req: Request, res: Response, next: NextFunction) => {
  try {

    const userData = await verifyUser(req) as JwtPayload;

    // Attach to Request
    req.user = {
      role: userData.role.toLowerCase(),
      id: userData.id,
      auth: false
    };


    let url = req.baseUrl + (req.path == "/" ? "" : req.path);
    url = url.split("v1/")[1];

    for(let k in req.params){
      url = url.replace(`/${req.params[k]}`, ''); // Replace     // url = url.replace(`/${req.params['id']}`, '');  
    }

    let data = await urlModel
      .findOne({ url })
      .populate(generatePopulateOptions(url.split("/").length)); // new add level for parent level -  Old =>  url.split("/").length - 1
    
    if (!data) throw Error("resource is not allowed");
    
    let pointer: any = data;
    
    do {
  
      if (
        pointer.roles.includes(req.user.role) 
        &&
        (pointer.method === req.method.toLowerCase() || pointer.method === "*")
      ) {
        req.user.auth = true;
        return next()
      }
      pointer = pointer.parent;
    } while (pointer);


    // attach authorization meta data to request
    // if (req.user.auth) return next();
    res.status(409).json({ message: "resource is not allowed" });

  } catch (error) {
    console.log(error);
    return res.status(409).json({ message: "resource is not allowed" })
  }
};





function generatePopulateOptions (depth: number){
  if (depth <= 0) {
    return null;
  }

  return {
    path: "parent",
    populate: generatePopulateOptions(depth - 1),
  };
}


