import { Body, Controller, Get, Post, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto } from './dtos/SignUpUser.dto';
import { LoginUserDto } from './dtos/LoginUser.dto';
import { LocalGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';
import { Users } from '../users/schemas/users.schema';
import mongoose, { AnyObject } from 'mongoose';



@Controller('auth')
export class AuthController {
    constructor(
        private authService : AuthService
    ){}

    @UseGuards(JwtGuard)
    @Get('/users')
    private async GetUsers():Promise<(mongoose.Document<unknown, AnyObject, Users> & Users & {
        _id: mongoose.Types.ObjectId;
    })[]>{
        return this.authService.getAllUsers()

    }
    
    @Post('/signup')
    @UsePipes(ValidationPipe)
    private async Signup(@Body() signupUser: SignUpUserDto):Promise<Users>{
        return this.authService.signup(signupUser)

    }
    
    @UseGuards(LocalGuard)
    @Post('/login')
    @UsePipes(ValidationPipe)
    private async Login(@Body() LoginUser: LoginUserDto): Promise<{Token:string, userId:mongoose.Types.ObjectId}>{
        const token = await this.authService.login(LoginUser)
        const Token = token.token
        const { username } = LoginUser
        const user = await this.authService.findOne(username)
        if (!user){
            throw new UnauthorizedException("invalid credentials")
        }
        const userId = user._id
        return { Token, userId}
    }

}

