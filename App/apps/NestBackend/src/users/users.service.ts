import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name)
        private UsersModel : Model<Users>
    ){}



    GetAllUsers(): Promise<Users[]>{
        const users = this.UsersModel.find()
        return users

    }

    async GetUserById(id: string): Promise<Users> {
        const user = (await this.UsersModel.findById(id).exec()).populate('role');
        return user;
      }

    CreateUser(user: CreateUserDto): Promise<Users> {
        const User = this.UsersModel.create(user)
        return User

    }



    UpdateUserById(id: string , updateuser: UpdateUserDto): Promise<Users> | undefined{
        const user = this.UsersModel.findByIdAndUpdate(id,updateuser)
        return user
    }

    
}
