import { Module } from '@nestjs/common';
import { DictActivityService } from './dict-activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictActivity } from './activity.entity';
import { DictActivityController } from './dict-activity.controller'

@Module({
  imports: [TypeOrmModule.forFeature([DictActivity])],
  providers: [DictActivityService],
  controllers: [DictActivityController],
})
export class DictActivityModule {}

