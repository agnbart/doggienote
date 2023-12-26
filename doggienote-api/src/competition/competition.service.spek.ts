import { Test, TestingModule } from '@nestjs/testing';
import { CompetitionService } from './competition.service';
import { Repository } from 'typeorm';
import { Competition } from './competition.entity';

describe('CompetitionService', () => {
  let service: CompetitionService;
  let competitionRepositoryMock: Repository<Competition>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetitionService],
    }).compile();

    service = module.get<CompetitionService>(CompetitionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
