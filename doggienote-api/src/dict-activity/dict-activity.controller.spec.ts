import { Test, TestingModule } from '@nestjs/testing';
import { DictActivityController } from './dict-activity.controller';
import { DictActivityService } from './dict-activity.service';

describe('DictActivityController', () => {
  let controller: DictActivityController;
  let dictActivityServiceMock: DictActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DictActivityController],
      providers: [
        {
          provide: DictActivityService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            createDictActivity: jest.fn(),
            updateActivity: jest.fn(),
            deleteDictActivity: jest.fn(),
            // Dodaj tu inne metody, które są używane przez kontroler
          },
        },
      ],
    }).compile();

    controller = module.get<DictActivityController>(DictActivityController);
    dictActivityServiceMock = module.get<DictActivityService>(DictActivityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of dictActivities', async () => {
      const result = []; // Zakładamy, że to jest oczekiwany wynik
      jest.spyOn(dictActivityServiceMock, 'findAll').mockResolvedValue(result);
  
      expect(await controller.findAll()).toBe(result);
      expect(dictActivityServiceMock.findAll).toHaveBeenCalled();
    });
  });
  
});
