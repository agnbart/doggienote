import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DictActivity } from './dic-activity.entity';
import { ActivityService } from './../activity/activity.service';
import {
  ErrorDoggienote,
  ErrorDoggienoteNotCreated,
  ErrorDoggienoteNotFound,
} from '../error-doggienote';
import { FindDictActivityDto } from './dto/find-dict-activity.dto';
import { CreateDictActivityDto } from './dto/create-dict-activity.dto';
import { UpdateDictActivityDto } from './dto/update-dict-activity.dto';

@Injectable()
export class DictActivityService {
  constructor(
    @InjectRepository(DictActivity)
    private dictActivityRepository: Repository<DictActivity>,
    private activityServis: ActivityService,
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
    try {
      const dictActivity = await this.dictActivityRepository.findOneOrFail({
        where: { id },
      });
      return dictActivity;
    } catch (error) {
      throw new ErrorDoggienoteNotFound();
    }
  }

  async createDictActivity(
    dictActivityDto: CreateDictActivityDto,
  ): Promise<CreateDictActivityDto> {
    try {
      const newDictActivity =
        this.dictActivityRepository.create(dictActivityDto);
      return await this.dictActivityRepository.save(newDictActivity);
    } catch (error) {
      throw new ErrorDoggienoteNotCreated();
    }
  }

  async updateActivity(
    id: string,
    updateDictActivityDto: Partial<UpdateDictActivityDto>,
  ): Promise<DictActivity> {
    try {
      const dictActivityToUpdate =
        await this.dictActivityRepository.findOneOrFail({
          where: { id },
        });
      const { dict_activity, ...rest } = updateDictActivityDto;
      const updatedDictActivity = Object.assign({}, dictActivityToUpdate, rest);
      return this.dictActivityRepository.save(updatedDictActivity);
    } catch (error) {
      throw new ErrorDoggienoteNotFound();
    }
  }

  async deleteDictActivity(id: string) {
    const dictActivityToDelete = await this.dictActivityRepository.findOne({
      where: { id },
    });
    if (dictActivityToDelete === null) {
      throw new ErrorDoggienoteNotFound();
    } else {
      if (dictActivityToDelete.removable === false) {
        throw new ErrorDoggienote(
          'This dictActivity cannot be removed',
          403,
          'dn_4',
        );
      } else {
        if (dictActivityToDelete.removable === true) {
          if (await this.activityServis.findByIdDictActivity(id)) {
            throw new ErrorDoggienote(
              'This dictActivity is used in Activity database. It cannot be removed.',
              403,
              'dn_3',
            );
          } else {
            await this.dictActivityRepository.delete(id);
          }
        }
      }
    }
  }
}
