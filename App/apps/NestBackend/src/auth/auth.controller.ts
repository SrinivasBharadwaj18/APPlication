import { Body, Controller, Get, Headers, Patch, Post, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dtos/SignUpUser.dto';
import { LoginUserDto } from './dtos/LoginUser.dto';
import { LocalGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';
import { UpdateUserDto } from '../users/dtos/UpdateUser.dto';
import { Users } from '../users/schemas/users.schema';
import mongoose, { AnyObject } from 'mongoose';
import { SignupInterceptor } from './interceptors/signup.interceptor';
import { UpdateInterceptor } from './interceptors/update.interceptor';


@Controller('auth')
export class AuthController {
    constructor(
        private AuthService : AuthService
    ){}


    @Get('/users')
    async GetUsers():Promise<(mongoose.Document<unknown, AnyObject, Users> & Users & {
        _id: mongoose.Types.ObjectId;
    })[]>{
        return this.AuthService.GetAllUsers()

    }
    
    @Post('/signup')
    @UsePipes(ValidationPipe)
    @UseInterceptors(SignupInterceptor)
    async Signup(@Body() signupUser: SignUpUserDto):Promise<Users>{
        return this.AuthService.Signup(signupUser)

    }
    
    @UseGuards(LocalGuard)
    @Post('/login')     // this route returns a token.
    @UsePipes(ValidationPipe)
    async Login(@Body() LoginUser: LoginUserDto): Promise<{Token:string, userId:mongoose.Types.ObjectId}>{
        const token = await this.AuthService.login(LoginUser)
        const Token = token.token
        const { username } = LoginUser
        const user = await this.AuthService.findOne(username)
        if (!user){
            throw new UnauthorizedException("invalid credentials")
        }
        const userId = user._id
        return { Token, userId}
    }

    @UseInterceptors(UpdateInterceptor)
    @UseGuards(JwtGuard)
    @UsePipes(ValidationPipe)
    @Patch("/update")
    async Update(@Body() UpdateUser: UpdateUserDto, @Headers('userid') userid: string ){
        return this.AuthService.UpdateUser(userid,UpdateUser)
    }
}

