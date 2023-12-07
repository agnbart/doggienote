import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DogService } from './dog.service';
import { Dog } from './dog.entity';

@Controller('dogs')
export class DogController {
  constructor(private readonly dogService: DogService) {}

  @Get('/')
  findAll() {
    return this.dogService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<Dog> {
    return this.dogService.findOne(id);
  }

  @Delete('/:id')
  removeDog(@Param('id') id: string) {
    this.dogService.removeDog(id);
  }

  @Post('/')
  createDog(@Body() dogData: Partial<Dog>): Promise<Dog> {
    return this.dogService.createDog(dogData);
  }

  @Patch('/:id')
  async updateOne(
    @Param('id') id: string,
    @Body() dogData: Partial<Dog>,
  ): Promise<Dog> {
    const dog = await this.dogService.updateDog(id, dogData);
    return dog;
  }
}