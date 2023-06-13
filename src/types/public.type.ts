import { ObjectId } from "mongoose";
import { IUser } from "./user.types";

export interface HttpError extends Error{
    status : number
}

export type Response_Type = {

    Status_Code : number ,
    Response_Massage? : string | undefined,
    Response_Data? : object | undefined,
    errors? : object | undefined
    

};


export interface jwtToken {
    id : ObjectId;
    username : IUser["username"]
};

export type FindDoc<T> = T | undefined | null

