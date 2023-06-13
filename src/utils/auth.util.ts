import { compareSync, genSaltSync, hashSync } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { jwtToken } from "../types/public.type";

const AccessTokenSecretKey : string = '4204957E27FA164A6782C54BC24ECB8E';

export class AuthUtils {
    public static hashpassword(password : string) : string {
        const salt = genSaltSync(10);
        return hashSync(password , salt);
    };
    public static comparepassword(password : string , hashedpassword : string) : boolean {
        return compareSync(password , hashedpassword)
    };
    public static generateToken(payload : jwtToken) :string {
        const now : number = new Date().getTime();
        const expirestime : number = 1000 * 60 * 60 * 24;
       return sign(payload , AccessTokenSecretKey , {expiresIn : now + expirestime})
    };
    public static decodeToken(token : string) :jwtToken {
        return verify(token , AccessTokenSecretKey) as jwtToken;
    }
}



