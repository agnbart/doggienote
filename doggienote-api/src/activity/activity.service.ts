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
    try {
      const activity = await this.activityRepository.findOne({ where: { id } });
      return activity;
    } catch (error) {
      throw new ErrorDoggienoteNotFound();
    }
  }

  async findByIdDog(id_dog: string): Promise<FindActivityDto> {
    try {
      const foundDog = await this.activityRepository.findOne({
        where: { id_dog },
      });
      return foundDog;
    } catch (error) {
      throw new ErrorDoggienoteNotFound();
    }
  }

  async findByIdDictActivity(
    id_dict_activity: string,
  ): Promise<FindActivityDto> {
    try {
      const foundDictActivity = await this.activityRepository.findOne({
        where: { id_dict_activity },
      });
      return foundDictActivity;
    } catch (error) {
      throw new ErrorDoggienoteNotFound();
    }
  }

  async createActivity(
    activityCreateDto: CreateActivityDto,
  ): Promise<CreateActivityDto> {
    try {
      const newActivity =
        await this.activityRepository.create(activityCreateDto);
      return await this.activityRepository.save(newActivity);
    } catch (error) {
      throw new ErrorDoggienoteNotCreated();
    }
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
