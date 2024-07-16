import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(
        private AuthService : AuthService
    ){
        super()
    }

    validate(username: string , password: string){
        if(!username || !password){
            throw new UnauthorizedException("missing username or password")
        }
        const user = this.AuthService.ValidateUser(username, password)
        return user
    }

}