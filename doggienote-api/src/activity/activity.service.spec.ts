import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from './activity.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Activity } from './activity.entity';
import { Repository } from 'typeorm';

describe('ActivityService', () => {
  let service: ActivityService;
  let repository: Repository<Activity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityService,
        {
          provide: getRepositoryToken(Activity),
          useClass: Repository, // Tu można użyć rzeczywistego repozytorium, moka, lub klasy zastępczej
        },
      ],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
    repository = module.get<Repository<Activity>>(getRepositoryToken(Activity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of activities', async () => {
      const result = []; // Zakładamy, że to jest oczekiwany wynik
      jest.spyOn(repository, 'find').mockResolvedValue(result);
  
      expect(await service.findAll()).toBe(result);
    });
  });
});
