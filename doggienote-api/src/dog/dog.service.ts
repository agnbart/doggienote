import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dog } from './dog.entity';

@Injectable()
export class DogService {
  constructor(
    @InjectRepository(Dog)
    private dogRepository: Repository<Dog>,
  ) {}

  async findAll(): Promise<Dog[]> {
    const dogs = await this.dogRepository.find();
    return dogs;
  }

  async findOne(id: string): Promise<Dog> {
    return this.dogRepository.findOneOrFail({ where: { id } });
  }

  async createDog(dogData: Partial<Dog>): Promise<Dog> {
    const newDog = this.dogRepository.create(dogData);
    return this.dogRepository.save(newDog);
  }

  async removeDog(id: string) {
    await this.dogRepository.delete( id );
  }

  async updateDog(id:string, dogData: Partial<Dog>): Promise<Dog> {
    const dogToUpdate = await this.dogRepository.findOneOrFail({ where: { id } });
    const { name, ...rest } = dogData;
    const updatedDog = Object.assign({}, dogToUpdate, rest);
    return this.dogRepository.save(updatedDog);
  }
}