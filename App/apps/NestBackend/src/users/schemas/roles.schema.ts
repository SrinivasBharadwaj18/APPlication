import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class Roles{

    @Prop()
    restrictedFeatures: string[] | undefined
}

export const RolesSchema = SchemaFactory.createForClass(Roles)