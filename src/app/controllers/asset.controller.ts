import { Request, Response, NextFunction } from "express";
import { addToAssetService } from "../services/asset.service";
import responseUtil from "../utils/response.util";
import httpResStatus from "../types/http-status-code.type";

export async function addToAsset(req: Request, res: Response) {
    
    try{
        let result = await addToAssetService(req.body);

        return responseUtil(req, res, result.status as httpResStatus , result.message, result.data)

    }catch(error){

        return responseUtil(req, res, "INTERNAL_SER_ERR" , error.message);
    }
    
}