import { IsNumber, IsOptional, IsString } from "class-validator";



export class UpdateUserDto{
    

    @IsString()
    @IsOptional()
    username?: string | undefined

    @IsString()
    @IsOptional()
    password?:string | undefined

    @IsString()
    @IsOptional()
    firstname: string | undefined

    @IsString()
    @IsOptional()
    lastname: string | undefined

    @IsString()
    @IsOptional()
    emailid: string | undefined

    @IsNumber()
    @IsOptional()
    role: number | undefined

    @IsNumber()
    @IsOptional()
    age: number

}