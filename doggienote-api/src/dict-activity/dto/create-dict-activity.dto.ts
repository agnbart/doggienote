import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateDictActivityDto {
  @ApiProperty({
    description: 'Unique identifier assigned by the database',
    readOnly: true,
  })
  id: string;

  @ApiProperty({
    description: 'dictionary of dog activities',
    required: true,
    minLength: 3,
    maxLength: 15,
    example: 'zdrowie, trening, spacer',
  })
  @IsNotEmpty()
  @Length(3, 15)
  dict_activity: string;

  @ApiProperty({ required: false })
  @IsOptional()
  description: string | null;

  @ApiProperty({
    description: 'Indicates if the activity is removable',
    type: Boolean,
    default: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  removable: boolean = false;
}
