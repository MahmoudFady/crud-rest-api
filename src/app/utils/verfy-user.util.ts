import {verify as jwtVerify} from 'jsonwebtoken';
import {Request} from 'express';

export async function verifyUser(req: Request) {


    let token = '';
    if (req.headers['authorization'].startsWith(`${process.env.BEARER_SECRET}`)){
        token = req.headers['authorization'].split(' ')[1];
    }
    
    if (!token) {
        throw Error('In-valid Token')
    } 


    const decoded = await jwtVerify(token , process.env.TOKEN_SIGNATURE);

    return decoded;
}