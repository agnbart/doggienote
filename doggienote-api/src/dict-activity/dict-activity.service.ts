import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { DictActivity } from './dic-activity.entity';

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
    const newDictActivity =
      await this.dictActivityRepository.create(dictActivityData);
    return await this.dictActivityRepository.save(newDictActivity);
  }

  async updateActivity(
    id: string,
    activityData: Partial<DictActivity>,
  ): Promise<DictActivity> {
    const dictActivityToUpdate =
      await this.dictActivityRepository.findOneOrFail({
        where: { id },
      });
    const { dict_activity, ...rest } = activityData;
    const updatedDictActivity = Object.assign({}, dictActivityToUpdate, rest);
    return this.dictActivityRepository.save(updatedDictActivity);
  }

  async deleteActivity(id: string) {
    const dictActivityToDelete =
      await this.dictActivityRepository.findOneOrFail({ where: { id } });
    if (dictActivityToDelete.removable === true) {
      const dictActivityNameDeleted = dictActivityToDelete.dict_activity;
      await this.dictActivityRepository.delete(id);
      //TODO: handle returning deleted dict_activity name
      console.log(`${dictActivityNameDeleted} was deleted`);
    } else {
      return new Error('This activity cannot be deleted.')
    }
  }
}
