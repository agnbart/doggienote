import { PartialType } from '@nestjs/mapped-types';
import { CreateDictActivityDto } from './create-dict-activity.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateDictActivityDto extends PartialType(CreateDictActivityDto) {
  @ApiProperty({ required: true, description: 'dict-activity uuid' })
  @IsNotEmpty()
  readonly id: string;
}
