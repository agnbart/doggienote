import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dog } from './dog.entity';
import { ActivityService } from 'src/activity/activity.service';

@Injectable()
export class DogService {
  private logger = new Logger(DogService.name);
  constructor(
    @InjectRepository(Dog)
    private dogRepository: Repository<Dog>,
    private activityServis: ActivityService,
  ) {}

  async findAll(): Promise<Dog[]> {
    return await this.dogRepository.find();
  }

  async findOne(id: string): Promise<Dog> {
    return await this.dogRepository.findOneOrFail({ where: { id } });
  }

  async createDog(dogData: Partial<Dog>): Promise<Dog> {
    const newDog = this.dogRepository.create(dogData);
    return await this.dogRepository.save(newDog);
  }

  async removeDog(id: string) {
    try {
      const activity = await this.activityServis.findByIdDog(id);
      if (activity.length === 0) {
        await this.dogRepository.delete(id);
      } else {
        throw new Error('This dog has activity. It cannot be removed.');
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  async updateDog(id: string, dogData: Partial<Dog>): Promise<Dog> {
    const dogToUpdate = await this.dogRepository.findOneOrFail({
      where: { id },
    });
    const { name, ...rest } = dogData;
    const updatedDog = Object.assign({}, dogToUpdate, rest);
    return this.dogRepository.save(updatedDog);
  }
}
