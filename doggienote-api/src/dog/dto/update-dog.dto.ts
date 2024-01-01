import { PartialType } from '@nestjs/mapped-types';
import { CreateDogDto } from './create-dog.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateDogDto extends PartialType(CreateDogDto) {
  @ApiProperty({required: true, description: 'dog uuid'})
  @IsNotEmpty()
  readonly id: string;
}
