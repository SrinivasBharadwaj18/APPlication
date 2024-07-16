import { IsInt, IsString } from "class-validator";



export class CreateUserDto{
    
    @IsString()
    name: string

    @IsString()
    username : string

    @IsInt()
    age: number

}