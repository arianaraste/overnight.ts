
import { UserModel } from "../models/user.model";
import { AuthUtils} from "../utils/auth.util";
import { LoginDTO, RegisterDTO } from "../dto/auth.dto";
import { IUser } from "../types/user.types";
import { validateSync } from "class-validator";
import { errorhandler } from "../utils/ApiErrorHandller";


export class AuthService {
    async register(UserDto : RegisterDTO):Promise<IUser>{
    errorhandler(UserDto);
    const existuser = await UserModel.findOne({username : UserDto.username});
    if(existuser) throw {status : 400 , massage : "this username already exist"}
    const newpassword= AuthUtils.hashpassword(UserDto.password)
    UserDto.password = newpassword
    const user : IUser = await UserModel.create(UserDto);
    return user

    };
    async login(LoginDto : LoginDTO): Promise<IUser> {
        errorhandler(LoginDTO)
        const {username , password} = LoginDto
        const existuser : IUser | null  = await UserModel.findOne({username});
        if(!existuser) throw {status : 401 , message : "the username or password isnt corecete"};
        const isTrueUser : boolean = AuthUtils.comparepassword(password , existuser.password);
        if(!isTrueUser) throw {status : 401 , message : "the username or password isnt corecete"};
        const token = AuthUtils.generateToken({username , id : existuser._id});
        existuser.accessToken = token ;
        await existuser.save();
        return existuser
    }

}