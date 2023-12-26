import { Test, TestingModule } from '@nestjs/testing';
import { DogService } from './dog.service';
import { Repository } from 'typeorm';
import { Dog } from './dog.entity';
import { ActivityService } from './../activity/activity.service'; // Uwzględnij poprawną ścieżkę
import { getRepositoryToken } from '@nestjs/typeorm';
import { ErrorDoggienoteNotFound } from './../error-doggienote';
import { CreateDogDto } from './dto/create-dog.dto';

describe('DogService', () => {
  let service: DogService;
  let dogRepositoryMock: Repository<Dog>;
  let activityServiceMock: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DogService,
        {
          provide: getRepositoryToken(Dog),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            findOneOrFail: jest.fn(),
          },
        },
        {
          provide: ActivityService,
          useValue: {
            findByIdDog: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DogService>(DogService);
    dogRepositoryMock = module.get<Repository<Dog>>(getRepositoryToken(Dog));
    activityServiceMock = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of dogs', async () => {
    const result = []; // Przykładowy wynik
    jest.spyOn(dogRepositoryMock, 'find').mockResolvedValue(result);
    expect(await service.findAll()).toBe(result);
  });

  it('should find a dog by id', async () => {
    // Arrange
    const mockDog = new Dog(); // Tworzenie instancji klasy Dog z pliku dog.entity.ts
    mockDog.id = '1';
    mockDog.name = 'Buddy';
    mockDog.id_user = 'a';
    jest.spyOn(dogRepositoryMock, 'findOne').mockResolvedValue(mockDog);
    // Act
    const foundDog = await service.findOne('1');
    // Assert
    expect(foundDog).toBeDefined();
  });

  it('should create a new dog', async () => {
    const createDogDto = new CreateDogDto();
    createDogDto.name = 'La';
      createDogDto.kennel_name = 'any kennel';
      createDogDto.official_name = 'Lavenda';
      createDogDto.date_of_birth = new Date('2023-01-01');
      createDogDto.height_category = 'M';
      createDogDto.id_user = '1';

      const newDog: Dog = {
        id: '1',
        ...createDogDto,
      };
    jest.spyOn(service['dogRepository'], 'create').mockReturnValue(newDog);
    jest.spyOn(service['dogRepository'], 'save').mockResolvedValue(newDog);

    const result = await service.createDog(newDog);
    expect(result).toEqual(newDog);
  });

  // it('should throw an error if dog is not created', async () => {
  //   const createDogDto = { name: 'Buddy', breed: 'Labrador' };
  //   jest.spyOn(service['dogRepository'], 'create').mockReturnValue(null);

  //   await expect(service.createDog(createDogDto)).rejects.toThrowError(
  //     'ErrorDoggienoteNotCreated',
  //   );
  // });

  // it('should throw ErrorDoggienoteNotFound when dog is not found', async () => {
  //   jest.spyOn(dogRepositoryMock, 'findOne').mockResolvedValue(null);

  //   await expect(service.findOne('1')).rejects.toThrow(ErrorDoggienoteNotFound);
  // });
});
