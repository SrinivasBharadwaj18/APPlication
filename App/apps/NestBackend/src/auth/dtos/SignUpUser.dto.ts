import { IsNotEmpty, IsNumber, IsString} from "class-validator"
// import { RolesDto } from "../../users/dtos/roles.dto"


export class SignUpUserDto{
    
    @IsString()
    @IsNotEmpty()
    username: string
    
    @IsString()
    @IsNotEmpty()
    emailid: string

    @IsString()
    @IsNotEmpty()
    firstname: string
    
    @IsString()
    @IsNotEmpty()
    lastname: string
    
    @IsString()
    @IsNotEmpty()
    password : string

    @IsNotEmpty()
    @IsString()
    role: string

    @IsNumber()
    @IsNotEmpty()
    age: number
    
}
