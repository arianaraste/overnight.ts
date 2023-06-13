import {Request , Response , NextFunction} from  "express";
import { UserModel } from "../models/user.model";
import { AuthUtils } from "../utils/auth.util";
import { IUser } from "../types/user.types";
import { AuthService } from "../services/auth.service";
import { LoginDTO, RegisterDTO } from "../dto/auth.dto";
import { plainToClass } from "class-transformer"
import {Controller , Post} from "@overnightjs/core";





@Controller("auth")
export class AuthController {

    private authservice : AuthService = new AuthService();
    
    @Post("register")
    async Register(req : Request , res : Response , next : NextFunction){
        
        try {
            const RegDTO : RegisterDTO = plainToClass(RegisterDTO , req.body , {excludeExtraneousValues : true});
            const user : IUser = await this.authservice.register(RegDTO);
            return res.send(user);

        } catch (error) {
               next(error)
        }
    };
    @Post("login")
    async Login(req : Request , res : Response , next : NextFunction){
        
        try {

            const {username , password} = req.body;
            const LogDTO : LoginDTO = plainToClass(LoginDTO , req.body , {excludeExtraneousValues : true});
            const user : IUser = await this.authservice.login(LogDTO);
           
            
            return res.json({
                status : 200 ,
                data : {
                    user 
                }
            })
           

        } catch (error) {
            console.log(error);
            
            next(error)
        }

    }


};

