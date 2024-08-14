import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [UsersModule,UtilsModule,AuthModule,ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }),MongooseModule.forRoot(process.env.DB_URI), ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
