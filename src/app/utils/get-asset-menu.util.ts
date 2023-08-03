import { Request, Response, NextFunction } from "express";
import responseUtil from "./response.util";
import assetModel from "../models/asset.model";


export async function getAssetMenu(req: Request, res: Response, next: NextFunction) {

    try{
        console.log(req.user.role)
        const assets = await assetModel.find({roles:{$in: req.user.role}}).select("assetsCodes -_id"); //  showToFront: true
        console.log(assets)
        const accessCode = [];
    
        assets.forEach((item)=>{
            accessCode.push(...item.assetsCodes)
        })
        return responseUtil(req, res,"OK", 'get all access code for role' , {accessCode} )

    }catch(error){
        responseUtil(req, res,"UN_AUTH", `${error.message}` );
    }
}
