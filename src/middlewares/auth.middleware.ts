import {Request,Response, NextFunction } from "express";
import { AuthUtils } from "../utils/auth.util";
import { UserModel } from "../models/user.model";
import { isJWT } from "class-validator";
import { IUser } from "../types/user.types";
;

declare global  {
    namespace Express {
        interface Request {
            user ?: IUser
        }
    }
}
export async function auth_middleware(req : Request , res : Response ,next : NextFunction) : Promise<void>{

    
    try {
        const Authorization : any| undefined = req?.headers?.authorization;
        if(Authorization){ 
        const [bearer , token]  = Authorization.split(" ");
        if(bearer.toLowerCase() !== "bearer")throw { status : 401 , message : "authorization token incorrect"};
        if(!isJWT(token))throw {  status : 401 , message : "token incorrect" }
        const { username , id : _id} = AuthUtils.decodeToken(token as string);
        if(!username || !_id) throw { status : 401 , message : "unauthorization"};
        const user : IUser | null = await UserModel.findOne({username});
        if (!user) throw { status : 401 , message : "unauthorization"};
        req.user = JSON.parse(JSON.stringify(user));
        next()
    } else throw { status : 401 , message : "unauthorization"}
    
    } catch (error) {

        next(error)

    } 
}  
           
                
            


