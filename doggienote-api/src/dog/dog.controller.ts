import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DogService } from './dog.service';
import { CreateDogDto } from './dto/create-dog.dt';
import { UpdateDogDto } from './dto/update-dog.dto';
import { FindDogDto } from './dto/find-dog.dto';

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
  async removeDog(@Param('id') id: string) {
    await this.dogService.removeDog(id);
  }

  @Post()
  async createDog(@Body() createDogDto: CreateDogDto): Promise<CreateDogDto> {
    return await this.dogService.createDog(createDogDto);
  }

  @Patch(':id')
  async updateDog(
    @Param('id') id: string,
    @Body() updateDogDto: UpdateDogDto,
  ): Promise<UpdateDogDto> {
    const dog = await this.dogService.updateDog(id, updateDogDto);
    return dog;
  }
}
