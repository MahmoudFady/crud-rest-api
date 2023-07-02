import { Response } from "express"
   
export const resHandler=(res:Response, statusCode:number, apiStatus:boolean, data:string, message:string)=>{
        res.status(statusCode).send({
            apiStatus,
            data,
            message
        })
    }