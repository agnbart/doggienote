import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './../activity/activity.entity';
import { DictActivity } from '../dict-activity/dict-activity.entity';
import { Dog } from './../dog/dog.entity';
import { Competition } from './../competition/competition.entity';
import { Course } from './../course/course.entity';
import { User } from 'user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.HOST'),
        username: configService.get<string>('database.USER'),
        password: configService.get<string>('database.PASSWORD'),
        database: configService.get<string>('database.DATABASE'),
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        entities: [User, Dog, DictActivity, Activity, Competition, Course],
        bigNumberStrings: false,
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
