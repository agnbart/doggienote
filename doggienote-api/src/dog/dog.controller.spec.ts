import { Test, TestingModule } from '@nestjs/testing';
import { DogController } from './dog.controller';
import { DogService } from './dog.service';

describe('DogController', () => {
  let controller: DogController;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('findAll', () => {
  //   it('should return an array of dogs', async () => {
  //     const result = []; // Przykładowy wynik
  //     jest.spyOn(dogServiceMock, 'findAll').mockResolvedValue(result);
  
  //     expect(await controller.findAll()).toBe(result);
  //     expect(dogServiceMock.findAll).toHaveBeenCalled();
  //   });
  // });

});

