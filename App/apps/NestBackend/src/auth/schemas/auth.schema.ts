import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema()
export class Auth {

    @Prop()
    username: string
    
    @Prop()
    email_id: string

    @Prop()
    firstname: string
    
    @Prop()
    lastname: string
    
    @Prop()
    password : string

    @Prop()
    role: number


}

export const AuthSchema = SchemaFactory.createForClass(Auth)