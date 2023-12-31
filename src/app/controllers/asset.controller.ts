import { Request, Response, NextFunction } from "express";
import { addToAssetService, getAssetMenuService, getAssetMenuV2Service } from "../services/asset.service";
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

export async function getAssetMenu(req: Request, res: Response) {
    try{
        let result = await getAssetMenuService(req.user.role, req.user.id);

        return responseUtil(req, res, result.status as httpResStatus , result.message, result.data)

    }catch(error){

        return responseUtil(req, res, "INTERNAL_SER_ERR" , error.message);
    }
}

export async function getAssetMenuV2(req: Request, res: Response) {
    try{
        
        let result = await getAssetMenuV2Service(req.query['role'] as string);

        return responseUtil(req, res, result.status as httpResStatus , result.message, result.data)

    }catch(error){

        return responseUtil(req, res, "INTERNAL_SER_ERR" , error.message);
    }
}