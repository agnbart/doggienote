import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dog } from './dog.entity';
import { ActivityService } from './../activity/activity.service';
import {
  ErrorDoggienote,
  ErrorDoggienoteNotCreated,
  ErrorDoggienoteNotFound,
} from '../error-doggienote';
import { FindDogDto } from './dto/find-dog.dto';
import { CreateDogDto } from './dto/create-dog.dto';

@Injectable()
export class DogService {
  logger = new Logger(DogService.name);
  constructor(
    @InjectRepository(Dog)
    private dogRepository: Repository<Dog>,
    private activityServis: ActivityService,
  ) {}

  async findAll(): Promise<FindDogDto[]> {
    try {
      const dogs = await this.dogRepository.find();
      return dogs;
    } catch (error) {
      throw new ErrorDoggienoteNotFound();
    }
  }

  async findOne(id: string): Promise<FindDogDto> {
    const dog = await this.dogRepository.findOne({ where: { id } });
    if (!dog) {
      throw new ErrorDoggienoteNotFound();
    }
    return dog;
  }

  async createDog(createDogDto: CreateDogDto): Promise<Dog> {
    const newDog = this.dogRepository.create(createDogDto);
    if (!newDog) {
      throw new ErrorDoggienoteNotCreated();
    }
    return await this.dogRepository.save(newDog);
  }

  async removeDog(id: string) {
    const activity = await this.activityServis.findByIdDog(id);
    if (activity === null) {
      await this.dogRepository.delete(id);
      if ('affected') {
        throw new ErrorDoggienoteNotFound();
      }
    } else {
      throw new ErrorDoggienote(
        'This dog has activity. It cannot be removed.',
        403,
        'dn_3',
      );
    }
  }

  async updateDog(id: string, dogData: Partial<Dog>): Promise<Dog> {
    const dogToUpdate = await this.dogRepository.findOneOrFail({
      where: { id },
    });
    const { name, ...rest } = dogData;
    const updatedDog = Object.assign({}, dogToUpdate, rest);
    if (!updatedDog) {
      throw new ErrorDoggienoteNotFound();
    }
    return this.dogRepository.save(updatedDog);
  }
}
