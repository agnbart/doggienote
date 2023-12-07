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

  async findOne(id: string): Promise<Activity> {
    return await this.activityRepository.findOneOrFail({ where: { id } });
  }

  async createActivity(activityData: Partial<Activity>): Promise<Activity> {
    const newActivity = await this.activityRepository.create(activityData);
    return await this.activityRepository.save(newActivity);
  }

  async updateActivity(id:string, activityData: Partial<Activity>): Promise<Activity> {
    const dogToUpdate = await this.activityRepository.findOneOrFail({ where: { id } });
    const { activity, ...rest } = activityData;
    const updatedDog = Object.assign({}, dogToUpdate, rest);
    return this.activityRepository.save(updatedDog);
  }
}
