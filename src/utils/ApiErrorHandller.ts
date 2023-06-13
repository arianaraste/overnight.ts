import { Request , Response , NextFunction } from "express";
import { HttpError } from "../types/public.type";
import { ValidationError, validateSync } from "class-validator";
export function ApiErrorHandller(error : HttpError , req : Request , res : Response , next : NextFunction){

    const errorCode : number = error.status || 500;
    const message : string = error.message || "InternalServerError";
    res.status(errorCode).json({
        ...error,
        status : errorCode ,
        message
    })

}
export function NotFoundErrorHandller(req : Request , res : Response , next : NextFunction){

    const errorCode : number = 404;
    const message : string =  "NotFoundPage";
    res.status(errorCode).json({
        status : errorCode ,
        message
    })

};

export function errorhandler (dto : any){

    const errors : ValidationError[] = validateSync(dto)
    
    let errortext : any[] = [];
    
    for (const errorIteam of errors ) {
        
        errortext = errortext.concat(errorIteam.constraints);
        
    };
    if(errortext.length > 0) throw {status : 400 ,errors : errortext , message : "validation  error"}
    return errortext;
}