import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schemas/users.schema';

// const cookieSession = require('cookie-session')

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersModule],
  imports: [MongooseModule.forFeature([{name:Users.name, schema: UsersSchema}])]
})
export class UsersModule {
}
