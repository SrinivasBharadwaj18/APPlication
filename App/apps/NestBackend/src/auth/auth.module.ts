import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/Jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { Users, UsersSchema } from '../users/schemas/users.schema';
import { Roles, RolesSchema } from '../users/schemas/roles.schema';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,LocalStrategy],
  imports : [UsersModule,MongooseModule.forFeature([{name: Roles.name,schema: RolesSchema}]),JwtModule.registerAsync({
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
  }),
  MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema}])
]
})
export class AuthModule {}
