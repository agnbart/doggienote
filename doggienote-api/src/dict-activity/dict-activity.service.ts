import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DictActivity } from './dict-activity.entity';
import { ActivityService } from './../activity/activity.service';
import { ErrorDoggienote, ErrorDoggienoteNotFound } from '../error-doggienote';
import { FindDictActivityDto } from './dto/find-dict-activity.dto';
import { CreateDictActivityDto } from './dto/create-dict-activity.dto';
import { UpdateDictActivityDto } from './dto/update-dict-activity.dto';

@Injectable()
export class DictActivityService {
  constructor(
    @InjectRepository(DictActivity)
    private dictActivityRepository: Repository<DictActivity>,
    private activityService: ActivityService,
  ) {}

  async findAll(): Promise<FindDictActivityDto[]> {
    try {
      const dictActivities = await this.dictActivityRepository.find();
      return dictActivities;
    } catch (error) {
      throw new ErrorDoggienoteNotFound();
    }
  }

  async findOne(id: string): Promise<FindDictActivityDto> {
    const dictActivity = await this.dictActivityRepository.findOneOrFail({
      where: { id },
    });
    if (!dictActivity) {
      throw new ErrorDoggienoteNotFound();
    }
    return dictActivity;
  }

  async createDictActivity(dictActivityDto: CreateDictActivityDto) {
    const existingActivity = await this.dictActivityRepository.findOne({
      where: { dict_activity: dictActivityDto.dict_activity },
    });
    if (existingActivity) {
      throw new ErrorDoggienote(
        'This dict-activity already exists. You cannot add the same.',
        403,
        'dn_7',
      );
    }
    const newDictActivity = this.dictActivityRepository.create(dictActivityDto);
    return await this.dictActivityRepository.save(newDictActivity);
  }

  async updateActivity(
    id: string,
    updateDictActivityDto: UpdateDictActivityDto,
  ): Promise<UpdateDictActivityDto> {
    const dictActivityToUpdate =
      await this.dictActivityRepository.findOneOrFail({
        where: { id },
      });

    if (!dictActivityToUpdate) {
      throw new ErrorDoggienoteNotFound();
    }
    const { dict_activity, removable, ...rest } = updateDictActivityDto;
    const updatedDictActivity = Object.assign(dictActivityToUpdate, rest);
    return this.dictActivityRepository.save(updatedDictActivity);
  }

  async deleteDictActivity(id: string) {
    const dictActivityToDelete = await this.dictActivityRepository.findOne({
      where: { id },
    });

    if (!dictActivityToDelete) {
      throw new ErrorDoggienoteNotFound();
    }
    if (!dictActivityToDelete.removable) {
      throw new ErrorDoggienote(
        'This dictActivity cannot be removed',
        403,
        'dn_4',
      );
    }
    if (await this.activityService.findByIdDictActivity(id)) {
      throw new ErrorDoggienote(
        'This dictActivity is used in Activity database. It cannot be removed.',
        403,
        'dn_3',
      );
    }

    await this.dictActivityRepository.delete(id);
  }
}
