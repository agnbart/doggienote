import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Activity } from './activity.entity';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get('/')
  findAll() {
    return this.activityService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<Activity> {
    return this.activityService.findOne(id);
  }

  @Post('/')
  createActivity(@Body() activityData: Partial<Activity>): Promise<Activity> {
    return this.activityService.createActivity(activityData);
  }

  @Patch('/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() activityData: Partial<Activity>,
  ): Promise<Activity> {
    const activity = await this.activityService.updateActivity(id, activityData);
    return activity;
  }
}
