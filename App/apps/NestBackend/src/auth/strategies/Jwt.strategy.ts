import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Users } from "../../users/schemas/users.schema";





Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(Users.name)
        private UsersModel: Model<Users>
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }
    async validate(payload: { id: unknown; }){
        const { id } = payload
        const user = await this.UsersModel.findById(id)
        if(!user){
            throw new UnauthorizedException("invalid token")
        }
        return user

    }
}
