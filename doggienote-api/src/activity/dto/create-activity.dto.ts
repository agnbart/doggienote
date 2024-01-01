import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateActivityDto {
  @ApiProperty({
    description: 'Unique identifier assigned by the database',
    readOnly: true,
  })
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({ required: true, description: 'dog uuid' })
  @IsNotEmpty()
  id_dog: string;

  @ApiProperty({ required: true, description: 'dog uuid' })
  @IsNotEmpty()
  id_dict_activity: string;

  @ApiProperty({
    required: false,
    description:
      'completed - the activity has been completed, unfilled - activity planned',
  })
  @IsOptional()
  date_of_activity: Date | null;

  @ApiProperty({
    required: false,
    description:
      'detailed description of the activity, e.g. length of walk, exercises performed during fitness',
  })
  @IsOptional()
  description: string;

  @ApiProperty({ required: false, type: 'float' })
  @IsOptional()
  activity_duration: number | null;

  @ApiProperty({
    description: 'true - the activity has been completed, false - activity planned',
    type: Boolean,
    default: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  done: boolean = true;
}
