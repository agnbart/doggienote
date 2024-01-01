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
import { Public } from 'auth/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('dict-activity')
@Controller('dict-activity')
export class DictActivityController {
  constructor(private readonly dictActivityService: DictActivityService) {}

  @Get()
  async findAll(): Promise<FindDictActivityDto[]> {
    return await this.dictActivityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FindDictActivityDto> {
    const dictActivity = await this.dictActivityService.findOne(id);
    return dictActivity;
  }

  @Post()
  async createDictActivity(
    @Body() createDictActivityDto: CreateDictActivityDto,
  ): Promise<string> {
    const newDictActivity = await this.dictActivityService.createDictActivity(
      createDictActivityDto,
    );
    return newDictActivity.id;
  }

  @Patch(':id')
  async updateDictActivity(
    @Param('id') id: string,
    @Body() updateDictActivityDto: UpdateDictActivityDto,
  ): Promise<UpdateDictActivityDto> {
    return await this.dictActivityService.updateActivity(
      id,
      updateDictActivityDto,
    );
  }

  @Delete(':id')
  async deleteDictActivity(@Param('id') id: string) {
    await this.dictActivityService.deleteDictActivity(id);
    return id;
  }
}
