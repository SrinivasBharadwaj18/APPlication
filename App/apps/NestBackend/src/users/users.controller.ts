import { Body, Controller, Get, Param, Patch,Headers, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { Users } from './schemas/users.schema';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UpdateInterceptor } from '../auth/interceptors/update.interceptor';


@Controller('users')
export class UsersController {
    constructor(
        private usersService : UsersService
    ){}

    @UseGuards(JwtGuard)
    @Get()
    private async GetAllUsers(){
        return await this.usersService.getAllUsers()
    }
    
    @UseGuards(JwtGuard)
    @Get(':id')
    private async GetUserById(@Param('id') id: string): Promise<Users> {
      const user = await this.usersService.getUserById(id)
      return user;
    }
    
    @UseInterceptors(UpdateInterceptor)
    @UseGuards(JwtGuard)
    @UsePipes(ValidationPipe)
    @Patch("/update")
    private async Update(@Body() UpdateUser: UpdateUserDto, @Headers('userid') userid: string ){
        return this.usersService.updateUser(userid,UpdateUser)
    }
    
}
