import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DictActivity } from './dic-activity.entity';
import { ActivityService } from 'src/activity/activity.service';

@Injectable()
export class DictActivityService {
  private readonly logger = new Logger(DictActivityService.name);

  constructor(
    @InjectRepository(DictActivity)
    private dictActivityRepository: Repository<DictActivity>,
    private activityServis: ActivityService,
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
      this.dictActivityRepository.create(dictActivityData);
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

  async deleteActivity(id: string): Promise<Error> {
    try {
      const dictActivityToDelete =
        await this.dictActivityRepository.findOneOrFail({ where: { id } });

      if (dictActivityToDelete.removable === true) {

        const activity = await this.activityServis.findByIdDictActivity(id);

        if (activity.length === 0) {
          await this.dictActivityRepository.delete(id);
          //TODO: handle returning deleted dict_activity name
          this.logger.log(`DictActivitY: ${dictActivityToDelete.id} was deleted`);
        } else {
          throw new Error(
            'This dictActivity is used in Activity database. It cannot be removed.',
          );
        }
      } else {
        return new Error('This activity cannot be deleted.');
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
