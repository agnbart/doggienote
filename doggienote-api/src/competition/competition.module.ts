import { Module } from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { Competition } from './competition.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionController } from './competition.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Competition])],
  providers: [CompetitionService],
  controllers: [CompetitionController],
})
export class CompetitionModule {}
