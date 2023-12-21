import { Test, TestingModule } from '@nestjs/testing';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';

describe('ActivityController', () => {
  let controller: ActivityController;
  let service: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityController],
      providers: [
        {
          provide: ActivityService,
          useValue: {
            findByIdDictActivity: jest.fn(),
            findOne: jest.fn(),
            findAll: jest.fn(),
            findByIdDog: jest.fn(),
            createActivity: jest.fn(),
            removeActivity: jest.fn(),
            updateActivity: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ActivityController>(ActivityController);
    service = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call activityService.findAll', async () => {
      const result = []; // Zakładamy, że to jest oczekiwany wynik
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);
  
      expect(await controller.findAll()).toBe(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
