import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { DictActivityService } from './dict-activity.service';
import { DictActivity } from './activity.entity';

@Controller('dict-activity')
export class DictActivityController {
  constructor(private readonly dictActivityService: DictActivityService) {}

  @Get('/')
  findAll() {
    return this.dictActivityService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<DictActivity> {
    return this.dictActivityService.findOne(id);
  }

  @Post('/')
  createActivity(
    @Body() activityData: Partial<DictActivity>,
  ): Promise<DictActivity> {
    return this.dictActivityService.createDictActivity(activityData);
  }

  @Patch('/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() activityData: Partial<DictActivity>,
  ): Promise<DictActivity> {
    const dictActivity = await this.dictActivityService.updateActivity(
      id,
      activityData,
    );
    return dictActivity;
  }
}
