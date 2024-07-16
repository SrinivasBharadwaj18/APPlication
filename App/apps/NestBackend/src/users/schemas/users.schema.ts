import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Roles } from "./roles.schema";

@Schema()
export class Users {

    @Prop()
    username: string
    
    @Prop()
    emailid: string

    @Prop()
    firstname: string
    
    @Prop()
    lastname: string
    
    @Prop()
    password : string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref:'Roles'})
    role: Roles

    @Prop()
    age : number
}

export const UsersSchema = SchemaFactory.createForClass(Users)