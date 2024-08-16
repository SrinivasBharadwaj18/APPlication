import { Module } from '@nestjs/common';
import { UtilsController } from './utils.controller';
import { UtilsService } from './utils.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from '../users/schemas/users.schema';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from '../auth/strategies/Jwt.strategy';
import { Chat, ChatSchema } from './schemas/chat.schema';

@Module({
  controllers: [UtilsController],
  providers: [UtilsService,JwtStrategy],
  imports: [UsersModule,MongooseModule.forFeature([{name:Users.name, schema: UsersSchema},{name: Chat.name, schema: ChatSchema}]),JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory: ((config : ConfigService) =>{
      return{
        secret: config.get<string>('JWT_SECRET'),
        signOptions :
        {
          expiresIn: config.get<string | number>('JWT_EXPIRES')
        }
      }
    }
  )
  })]
})
export class UtilsModule {}
