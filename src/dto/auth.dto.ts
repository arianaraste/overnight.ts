import { Expose } from "class-transformer";
import { IsDefined , Matches } from "class-validator";

export class RegisterDTO {
    @IsDefined()
    @Expose()
    @Matches(RegExp(/^[A-Za-z0-9]\_\.{5,20}$/))
    
    username : string ;

    @IsDefined()
    @Expose()
    @Matches(RegExp(/^[A-Za-z0-9]\_\.{8,16}$/))

    password : string ;

    @IsDefined()
    @Expose()
    @Matches(RegExp(/^\w{5,35}$/))

    fullname : string ;
}

export class LoginDTO {
    @IsDefined()
    @Expose()
    @Matches(RegExp(/^[A-Za-z0-9]\_\.{5,20}$/))
    
    username : string ;

    @IsDefined()
    @Expose()
    @Matches(RegExp(/^[A-Za-z0-9]\_\.{8,16}$/))

    password : string ;


}
