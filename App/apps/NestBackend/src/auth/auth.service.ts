import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { AnyObject, Model } from 'mongoose';
import { SignUpUserDto } from './dtos/SignUpUser.dto';
import { LoginUserDto } from './dtos/LoginUser.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../users/dtos/UpdateUser.dto';
import { Users } from '../users/schemas/users.schema';
import { Roles } from '../users/schemas/roles.schema';



interface restrictedFeatures{

    restrictedFeatures: string[] | []
        
}

@Injectable()
export class AuthService {

    constructor(
        private JwtService : JwtService,
        @InjectModel(Users.name)
        private UsersModel: Model<Users>,
        @InjectModel(Roles.name)
        private RolesModel: Model<Roles>
    ){}

    CheckRole(role: string):restrictedFeatures{
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


    async Signup({role,...signupUser}: SignUpUserDto): Promise<Users>{ 
        const {username,password}  = signupUser
        const user = await this.UsersModel.findOne({username})
        signupUser.password =await bcrypt.hash(password,10)
        if(user){
            throw new UnauthorizedException("user already present")
        }
        const ResFeatures = this.CheckRole(role)  
        const roles = new this.RolesModel(ResFeatures)
        const savedRoles = await roles.save()
    
        const createdUser = await this.UsersModel.create({...signupUser, role: savedRoles._id})
        await createdUser.save()
        return createdUser


    }

    async login(loginUser: LoginUserDto): Promise<{token: string}>{
        const { username } = loginUser
        const user = await this.UsersModel.findOne({username})      
        const token = this.JwtService.sign({id:user._id})
        return {token}
        }

    async findOne(username:string){
        const user = await this.UsersModel.findOne({username})
        return user
    }

    async ValidateUser(username : string, password: string):Promise<Users>{
        const user = await this.UsersModel.findOne({username})
        if (!user){
            throw new UnauthorizedException("signup first")
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if(!isPasswordMatched){
            throw new UnauthorizedException("invalid password")
        }
        return user
    }

    async finduser(userId: string){
        return this.UsersModel.findById(userId)

    }


    async UpdateUser(id: string, UpdateUser: UpdateUserDto){
        const validate = mongoose.Types.ObjectId.isValid(id)

        if(!validate){
            throw new HttpException("invalid user", 400)
        }
        const {password} = UpdateUser
        if(password === undefined){
            const user = await this.UsersModel.findByIdAndUpdate(id,UpdateUser, {new: true})
            return user
        }
        UpdateUser.password = await bcrypt.hash(password,10)
        const user = await this.UsersModel.findByIdAndUpdate(id,UpdateUser, {new: true})
        if(!user){
            throw new HttpException("user not found",400)
        }
        return user

    }

    async GetAllUsers(): Promise<(mongoose.Document<unknown, AnyObject, Users> & Users & {
        _id: mongoose.Types.ObjectId;
    })[]>{
        return this.UsersModel.find()
    }
    
}
