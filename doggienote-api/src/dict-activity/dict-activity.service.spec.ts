import { Test, TestingModule } from '@nestjs/testing';
import { DictActivityService } from './dict-activity.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DictActivity } from './dict-activity.entity';
import { Repository } from 'typeorm';
import { ActivityService } from './../activity/activity.service';

describe('DictActivityService', () => {
  let service: DictActivityService;
  let dictActivityRepositoryMock: Repository<DictActivity>;
  let activityServiceMock: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DictActivityService,
        {
          provide: getRepositoryToken(DictActivity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findOneOrFail: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            // Dodaj tu inne potrzebne metody
          },
        },
        {
          provide: ActivityService,
          useValue: {
            // Tutaj mokujesz metody używane przez DictActivityService z ActivityService
            findByIdDictActivity: jest.fn(),
            // Dodaj tu inne potrzebne metody
          },
        },
      ],
    }).compile();

    service = module.get<DictActivityService>(DictActivityService);
    dictActivityRepositoryMock = module.get<Repository<DictActivity>>(getRepositoryToken(DictActivity));
    activityServiceMock = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of dictActivities', async () => {
      const result = []; // Zakładamy, że to jest oczekiwany wynik
      jest.spyOn(dictActivityRepositoryMock, 'find').mockResolvedValue(result);
  
      expect(await service.findAll()).toBe(result);
    });
  });
  
});
