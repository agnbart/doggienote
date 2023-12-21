import { Module } from '@nestjs/common';
import { DictActivityService } from './dict-activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictActivityController } from './dict-activity.controller';
import { DictActivity } from './dict-activity.entity';
import { ActivityModule } from './../activity/activity.module';

@Module({
  imports: [TypeOrmModule.forFeature([DictActivity]), ActivityModule],
  providers: [DictActivityService],
  controllers: [DictActivityController],
})
export class DictActivityModule {}
