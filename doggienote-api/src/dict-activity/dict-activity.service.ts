import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DictActivity } from './activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DictActivityService {
  constructor(
    @InjectRepository(DictActivity)
    private dictActivityRepository: Repository<DictActivity>,
  ) {}

  async findAll(): Promise<DictActivity[]> {
    return await this.dictActivityRepository.find();
  }

  async findOne(id: string): Promise<DictActivity> {
    return await this.dictActivityRepository.findOneOrFail({ where: { id } });
  }

  async createDictActivity(
    dictActivityData: Partial<DictActivity>,
  ): Promise<DictActivity> {
    const newDictActivity = await this.dictActivityRepository.create(dictActivityData);
    return await this.dictActivityRepository.save(newDictActivity);
  }

  async updateActivity(
    id: string,
    activityData: Partial<DictActivity>,
  ): Promise<DictActivity> {
    const dogToUpdate = await this.dictActivityRepository.findOneOrFail({
      where: { id },
    });
    const { activity, ...rest } = activityData;
    const updatedDog = Object.assign({}, dogToUpdate, rest);
    return this.dictActivityRepository.save(updatedDog);
  }
}
