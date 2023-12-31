import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity as Activity } from './activity.entity';
import { Repository } from 'typeorm';
import {
  ErrorDoggienoteNotCreated,
  ErrorDoggienoteNotFound,
} from '../error-doggienote';
import { FindActivityDto } from './dto/find-activity.dto';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dt';

@Injectable()
export class ActivityService {
  logger = new Logger(ActivityService.name);

  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  async findAll(): Promise<FindActivityDto[]> {
    try {
      const activities = await this.activityRepository.find();
      return activities;
    } catch (error) {
      throw new ErrorDoggienoteNotFound();
    }
  }

  async findOne(id: string): Promise<FindActivityDto> {
    const activity = await this.activityRepository.findOne({ where: { id } });
    if (!activity) {
      throw new ErrorDoggienoteNotFound();
    }
    return activity;
  }

  async findByIdDog(id_dog: string): Promise<FindActivityDto[]> {
    const foundDog = await this.activityRepository.find({
      where: { id_dog },
    });
    if (!foundDog || !Array.isArray(foundDog) || foundDog.length === 0) {
      throw new ErrorDoggienoteNotFound();
    }
    return foundDog;
  }

  async findByIdDictActivity(
    id_dict_activity: string,
  ): Promise<FindActivityDto> {
    const foundDictActivity = await this.activityRepository.findOne({
      where: { id_dict_activity },
    });
    if (!foundDictActivity) {
      throw new ErrorDoggienoteNotFound();
    }
    return foundDictActivity;
  }

  async findByDogByIdDictActivity(
    id_dog: string,
    id_dict_activity: string,
  ): Promise<FindActivityDto[]> {
    const foundDogDictActivity = await this.activityRepository.find({
      where: { id_dog, id_dict_activity },
    });
    if (!foundDogDictActivity) {
      throw new ErrorDoggienoteNotFound();
    }
    return foundDogDictActivity;
  }

  async createActivity(activityCreateDto: CreateActivityDto) {
    const newActivity = await this.activityRepository.create(activityCreateDto);
    if (!newActivity) {
      throw new ErrorDoggienoteNotCreated();
    }
    return await this.activityRepository.save(newActivity);
  }

  async removeActivity(id: string) {
    try {
      const removedActivity = await this.activityRepository.find({
        where: { id },
      });
      await this.activityRepository.delete(id);
    } catch (error) {
      throw new ErrorDoggienoteNotFound();
    }
  }

  async updateActivity(
    id: string,
    updateActivityDto: UpdateActivityDto,
  ): Promise<UpdateActivityDto> {
    try {
      const activityToUpdate = await this.activityRepository.findOne({
        where: { id },
      });
      const { id_dog: id_dog, id_dict_activity, ...rest } = updateActivityDto;
      const updateActivity = Object.assign({}, activityToUpdate, rest);
      return this.activityRepository.save(updateActivity);
    } catch (error) {
      throw new ErrorDoggienoteNotFound();
    }
  }
}
