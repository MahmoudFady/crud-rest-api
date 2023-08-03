import {verifyUser} from '../utils/verfy-user.util';
import { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';



export async function checkRole(req: Request, res: Response, next: NextFunction) {
    try{
        const userData = await verifyUser(req) as JwtPayload;



        // Attach to Request
        req.user = {
          role: userData.role.toLowerCase(),
          id: userData.id,
        };
    
        return next();
    }catch(error){
        console.log(error.message)
    }

}