import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Date } from "mongoose";

export type livechat = [{
    source : "user" | "bot"
    timestamp: Date
    message: string
}]


@Schema()
export class Chat{

    @Prop()
    livechat: livechat
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref:'Users'})
    userId: mongoose.Schema.Types.ObjectId



}

export const ChatSchema = SchemaFactory.createForClass(Chat)
