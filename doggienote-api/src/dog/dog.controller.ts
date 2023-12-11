import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DogService } from './dog.service';
import { Dog } from './dog.entity';

@Controller('dogs')
export class DogController {
  constructor(private readonly dogService: DogService) {}

  @Get()
  async findAll() {
    return await this.dogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Dog> {
    return await this.dogService.findOne(id);
  }

  @Delete(':id')
  async removeDog(@Param('id') id: string) {
    await this.dogService.removeDog(id);
  }

  @Post()
  async createDog(@Body() dogData: Partial<Dog>): Promise<Dog> {
    return await this.dogService.createDog(dogData);
  }

  @Patch(':id')
  async updateDog(
    @Param('id') id: string,
    @Body() dogData: Partial<Dog>,
  ): Promise<Dog> {
    const dog = await this.dogService.updateDog(id, dogData);
    return dog;
  }
}
