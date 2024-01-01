import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateDogDto {
  @ApiProperty({
    description: 'Unique identifier assigned by the database',
    readOnly: true,
  })
  id: string;

  @ApiProperty({
    required: true,
    minLength: 2,
    maxLength: 60,
    description: 'home name of dog',
  })
  @IsNotEmpty()
  @Length(2, 60)
  name: string;

  @ApiProperty({
    required: false,
    maxLength: 60,
  })
  @IsOptional()
  kennel_name: string | null;

  @ApiProperty({ required: false, maxLength: 60 })
  @IsOptional()
  official_name: string | null;

  @ApiProperty({
    required: false,
    maxLength: 2,
    description: 'for dogs training agility',
  })
  @IsOptional()
  height_category: string | null;

  @ApiProperty({ required: true, description: 'user uuid' })
  @IsNotEmpty()
  id_user: string;
}
