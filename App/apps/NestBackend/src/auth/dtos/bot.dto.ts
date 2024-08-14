import { IsNotEmpty, IsString } from "class-validator";


export class BotDto{

    @IsString()
    @IsNotEmpty()
    source : "user"| "bot"

    @IsString()
    @IsNotEmpty()
    message: string

    @IsString()
    @IsNotEmpty()
    timestamp: string

    @IsString()
    @IsNotEmpty()
    id: string

}