import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Competition } from './competition.entity';
import { Repository } from 'typeorm';
import { ErrorDoggienoteNotCreated, ErrorDoggienoteNotFound } from '../error-doggienote';

@Injectable()
export class CompetitionService {
  logger = new Logger(CompetitionService.name);
  constructor(
    @InjectRepository(Competition)
    private competitionRepository: Repository<Competition>,
  ) {}

  async findAll(): Promise<Competition[]> {
    const competitions = await this.competitionRepository.find();
    if (competitions === null) {
      throw new ErrorDoggienoteNotFound();
    } else {
      return competitions;
    }
  }

  async findOne(id: string): Promise<Competition> {
    try {
      const competition = await this.competitionRepository.findOne({
        where: { id },
      });
      if (competition === null) {
        throw new ErrorDoggienoteNotFound();
      } else {
        return competition;
      }
    } catch (error) {
      throw error;
    }
  }

  async createCompetition(competitionData: Partial<Competition>): Promise<Competition> {
    const newCompetition = this.competitionRepository.create(competitionData);
    if (newCompetition === null) {
      throw new ErrorDoggienoteNotCreated();
    }
    return await this.competitionRepository.save(newCompetition);
  }
}
