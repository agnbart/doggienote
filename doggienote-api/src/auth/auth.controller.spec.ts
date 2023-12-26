import { Test, TestingModule } from '@nestjs/testing';
import { DogController } from '../dog/dog.controller';
import { DogService } from '../dog/dog.service';

describe('DogController', () => {
  let controller: DogController;
  let dogServiceMock: DogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogController],
      providers: [
        {
          provide: DogService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            removeDog: jest.fn(),
            createDog: jest.fn(),
            updateDog: jest.fn(),
            // Dodaj tu inne metody, które są używane przez kontroler
          },
        },
      ],
    }).compile();

    controller = module.get<DogController>(DogController);
    dogServiceMock = module.get<DogService>(DogService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Tutaj dodaj testy dla poszczególnych metod kontrolera
});
