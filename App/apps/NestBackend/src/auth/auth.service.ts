import { HttpException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { AnyObject, Model } from 'mongoose';
import { SignUpUserDto } from './dtos/SignUpUser.dto';
import { LoginUserDto } from './dtos/LoginUser.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/schemas/users.schema';
import { Roles } from '../users/schemas/roles.schema';
import { restrictedFeatures } from './types/auth.types';

@Injectable()
export class AuthService {

    constructor(
        private JwtService : JwtService,
        @InjectModel(Users.name)
        private UsersModel: Model<Users>,
        @InjectModel(Roles.name)
        private RolesModel: Model<Roles>,
    ){}

    checkRole(role: string):restrictedFeatures{
        if(role === "basic user"){
            const ResFeatures:restrictedFeatures = {
                restrictedFeatures: ['test', 'create user']
            }
            return ResFeatures   
        }
        else if(role === "admin"){
            const ResFeatures:restrictedFeatures = {
                restrictedFeatures: []
            }
            return ResFeatures
        }    

    }


       async signup(signupUser: SignUpUserDto): Promise<Users>{ 
        const {username,password, role}  = signupUser
        const user = await this.UsersModel.findOne({username})
        signupUser.password =await bcrypt.hash(password,10)
        if(user){
            throw new UnauthorizedException("user already present")
        }
        const ResFeatures = this.checkRole(role)
        try{
            const presentrole = await this.RolesModel.findOne({rolename: role})
            if(!presentrole){
                const roles = new this.RolesModel({rolename: role, restrictedFeatures:ResFeatures.restrictedFeatures})
                const savedRoles = await roles.save()
                const createdUser = await this.UsersModel.create({...signupUser, role: savedRoles._id})
                await createdUser.save()
                return createdUser
            }  
            const createdUser = await this.UsersModel.create({...signupUser,role: presentrole._id})
            await createdUser.save()
            return createdUser
        }
        catch(error){
            throw new HttpException('something went wrong while creating a user', 500)
        }
        
    }



    async login(loginUser: LoginUserDto): Promise<{token: string}>{
        try{
            const { username } = loginUser
            const user = await this.UsersModel.findOne({username})      
            const token = this.JwtService.sign({id:user._id})
            return {token}
        }
        catch{
            throw new InternalServerErrorException('something went wrong while logging in')
        }
        }

    async findOne(username:string){
        try{
            const user = await this.UsersModel.findOne({username})
            return user
        }
        catch{
            throw new InternalServerErrorException('user not found')
        }
    }

    async validateUser(username : string, password: string):Promise<Users>{
        const user = await this.UsersModel.findOne({username})
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!user || !isPasswordMatched){
            throw new UnauthorizedException("invalid credentials")
        }
        return user
    }




    async getAllUsers(): Promise<(mongoose.Document<unknown, AnyObject, Users> & Users & {
        _id: mongoose.Types.ObjectId;
    })[]>{
        try{
            return this.UsersModel.find()
        }
        catch{
            throw new NotFoundException('could not find users')
        }
    }

}
