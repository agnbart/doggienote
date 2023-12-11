import { Module } from '@nestjs/common';
import { DictActivityService } from './dict-activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictActivityController } from './dict-activity.controller'
import { DictActivity } from './dic-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DictActivity])],
  providers: [DictActivityService],
  controllers: [DictActivityController],
})
export class DictActivityModule {}

