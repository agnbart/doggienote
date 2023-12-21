import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DictActivityService } from './dict-activity.service';
import { FindDictActivityDto } from './dto/find-dict-activity.dto';
import { CreateDictActivityDto } from './dto/create-dict-activity.dto';
import { UpdateDictActivityDto } from './dto/update-dict-activity.dto';

@Controller('dict-activity')
export class DictActivityController {
  constructor(private readonly dictActivityService: DictActivityService) {}

  @Get()
  async findAll(): Promise<FindDictActivityDto[]> {
    return await this.dictActivityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FindDictActivityDto> {
    return await this.dictActivityService.findOne(id);
  }

  @Post()
  async createDictActivity(
    @Body() createDictActivityDto:CreateDictActivityDto,
  ): Promise<CreateDictActivityDto> {
    return await this.dictActivityService.createDictActivity(createDictActivityDto);
  }

  @Patch(':id')
  async updateDictActivity(
    @Param('id') id: string,
    @Body() updateDictActivityDto: UpdateDictActivityDto,
  ): Promise<UpdateDictActivityDto> {
    const dictActivity = await this.dictActivityService.updateActivity(
      id,
      updateDictActivityDto,
    );
    return dictActivity;
  }

  @Delete(':id')
  async deleteDictActivity(@Param('id') id: string) {
    return this.dictActivityService.deleteDictActivity(id);
  }
}
