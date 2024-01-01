import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DogService } from './dog.service';
import { UpdateDogDto } from './dto/update-dog.dto';
import { FindDogDto } from './dto/find-dog.dto';
import { CreateDogDto } from './dto/create-dog.dto';
import { Public } from 'auth/auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('dogs')
@Controller('dogs')
export class DogController {
  constructor(private readonly dogService: DogService) {}

  @Get()
  async findAll(): Promise<FindDogDto[]> {
    return await this.dogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FindDogDto> {
    const dog = await this.dogService.findOne(id);
    return dog;
  }

  @Delete(':id')
  async removeDog(@Param('id') id: string): Promise<string> {
    await this.dogService.removeDog(id);
    return id;
  }

  @Post()
  async createDog(@Body() createDogDto: CreateDogDto): Promise<string> {
    const newDog = await this.dogService.createDog(createDogDto);
    return newDog.id;
  }

  @Patch(':id')
  async updateDog(
    @Param('id') id: string,
    @Body() updateDogDto: UpdateDogDto,
  ): Promise<UpdateDogDto> {
    return await this.dogService.updateDog(id, updateDogDto);
  }
}
