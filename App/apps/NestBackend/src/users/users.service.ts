import {HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import mongoose, { Model } from 'mongoose';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name)
        private usersModel : Model<Users>
    ){}



    async getAllUsers(): Promise<Users[]>{
        try{
            const users = this.usersModel.find()
            return users
        }
        catch{
            throw new NotFoundException("couldnt find users")
        }

    }

    async getUserById(id: string): Promise<Users> {
        try{
            const user = (await this.usersModel.findById(id).exec()).populate('role');
            return user;
        }
        catch{
            throw new NotFoundException("couldnt find user")
        }
      }

      async updateUser(id: string, updateUser: UpdateUserDto){
        try{

            const validate = mongoose.Types.ObjectId.isValid(id)
    
            if(!validate){
                throw new HttpException("invalid user", 400)
            }
            const {password} = updateUser
            if(password === undefined){
                const user = await this.usersModel.findByIdAndUpdate(id,updateUser, {new: true})
                return user
            }
            updateUser.password = await bcrypt.hash(password,10)
            const user = await this.usersModel.findByIdAndUpdate(id,updateUser, {new: true})
            if(!user){
                throw new HttpException("user not found",400)
            }
            return user
        }
        catch{
            throw new InternalServerErrorException('something went wrong during updating')
        }
    }

    
}
