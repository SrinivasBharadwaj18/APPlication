import { Body, Controller, Get, Param, Patch, Post, Session, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

import { Users } from './schemas/users.schema';
import { JwtGuard } from '../auth/guards/jwt.guard';


@Controller('users')
export class UsersController {
    constructor(
        private UsersService : UsersService
    ){}

    @UseGuards(JwtGuard)
    @Get()
    GetAllUsers(){
        return this.UsersService.getAllUsers()
    }
    
    @UseGuards(JwtGuard)
    @Post()
    async CreateUser(@Body() createUser :  CreateUserDto):Promise<Users>{
        const user = await this.UsersService.createUser(createUser)
        return user
    }
    
    @Get(':id')
    async GetUserById(@Param('id') id: string): Promise<Users> {
      const user = await this.UsersService.getUserById(id)
      return user;
    }
    
    @UseGuards(JwtGuard)
    @Patch("/update")
    async UpdateUserById(@Session() session :{userId: string}, @Body() updateUser : UpdateUserDto):Promise<Users>{
        return await this.UsersService.updateUserById(session.userId, updateUser)
    }

    
}
