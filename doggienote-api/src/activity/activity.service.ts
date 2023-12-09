import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async findAll(): Promise<Activity[]> {
    return await this.activityRepository.find();
  }

  async findByIdDog(id_dog: string): Promise<Activity[]> {
    return await this.activityRepository.find({ where: { id_dog } });
  }

  async findByIdActivity(id_dict_activity: string): Promise<Activity[]> {
    return await this.activityRepository.find({ where: { id_dict_activity } });
  }

  async createActivity(acivityData: Partial<Activity>): Promise<Activity> {
    const newActivity = await this.activityRepository.create(acivityData);
    return await this.activityRepository.save(newActivity);
  }

  async removeActivity(id: string) {
    await this.activityRepository.delete(id);
  }

  async updateActivity(
    id: string,
    activityData: Partial<Activity>,
  ): Promise<Activity> {
    const activityToUpdate = await this.activityRepository.findOneOrFail({
      where: { id },
    });
    const { id_dog, id_dict_activity, ...rest } = activityData;
    const updateActivity = Object.assign({}, activityToUpdate, rest);
    return this.activityRepository.save(updateActivity);
  }
}
