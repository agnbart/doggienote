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
import { UpdateDogDto } from './dto/update-dog.dto';

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

  async createDog(createDogDto: CreateDogDto) {
    const newDog = this.dogRepository.create(createDogDto);
    if(!newDog) {
      throw new ErrorDoggienoteNotCreated();
    }
    return await this.dogRepository.save(newDog);
  }

  async removeDog(id: string) {
    const activity = await this.activityServis.findByIdDog(id);
    if (activity) {
      throw new ErrorDoggienote(
        'This dog has activity. It cannot be removed.',
        403,
        'dn_3',
      );
    }
    const deleteResult = await this.dogRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new ErrorDoggienoteNotFound();
    }
  }

  async updateDog(id: string, updateDogDto: UpdateDogDto): Promise<UpdateDogDto> {
    const dogToUpdate = await this.dogRepository.findOneOrFail({
      where: { id },
    });
    if (!dogToUpdate) {
      throw new ErrorDoggienoteNotFound();
    }
    const { name, ...updateData } = updateDogDto;
    const updatedDog = Object.assign(dogToUpdate, updateData);
    return this.dogRepository.save(updatedDog);
  }
}
