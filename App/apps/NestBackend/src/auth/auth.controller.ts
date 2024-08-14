import { Body, Controller, Get, Headers, HttpException, Param, Patch, Post, Query, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
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
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { BotDto } from './dtos/bot.dto';
import { Cron } from '@nestjs/schedule';
import { DocxDto } from './dtos/docx.dto';


@Controller('auth')
export class AuthController {
    constructor(
        private AuthService : AuthService
    ){}

    @UseGuards(JwtGuard)
    @Get('/users')
    private async GetUsers():Promise<(mongoose.Document<unknown, AnyObject, Users> & Users & {
        _id: mongoose.Types.ObjectId;
    })[]>{
        console.log("inside the get users")
        return this.AuthService.getAllUsers()

    }
    
    @Post('/signup')
    @UsePipes(ValidationPipe)
    @UseInterceptors(SignupInterceptor)
    private async Signup(@Body() signupUser: SignUpUserDto):Promise<Users>{
        return this.AuthService.signup(signupUser)

    }
    
    @UseGuards(LocalGuard)
    @Post('/login')
    @UsePipes(ValidationPipe)
    private async Login(@Body() LoginUser: LoginUserDto): Promise<{Token:string, userId:mongoose.Types.ObjectId}>{
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
    private async Update(@Body() UpdateUser: UpdateUserDto, @Headers('userid') userid: string ){
        return this.AuthService.updateUser(userid,UpdateUser)
    }

    // @Patch('update/json')
    // private async update(@Query() fileName: string, @Body() body: any){
    //     return this. AuthService.getData(fileName, body)
    // }

//file upload using multer
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file',{
        storage: diskStorage({
            destination: './uploadedFiles',
            filename(req, file, callback) {
                const filename = file.originalname
                callback(null,filename)
            },
        })
    }))
    uploadFile(@UploadedFile() file:Express.Multer.File){
        if(!file) throw new HttpException("no file submitted",400)
        console.log("file:", file)
        return "we have the file"
    }
    @Post('/bot')
    async Bot(@Body() input:BotDto){
        const botMessage = await this.AuthService.getBotMessage(input)
        return botMessage
    }

    // @Cron('0 */2 9-17 * * *')
    async handleSaveFile(){
        return await this.AuthService.saveFile()
    }

    @Post('/docx')
    async writeDocxFile(@Body() body: DocxDto){
        return await this.AuthService.writeWord(body)
    }

    // @Post('/pdf')
    // writePdfFile(@Param() data: any, @Body() body:DocxDto){
    //     return this.AuthService.writePdf(data, body)
    // }
}

