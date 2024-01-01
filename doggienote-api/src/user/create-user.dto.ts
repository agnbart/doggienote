import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Unique identifier assigned by the database',
    readOnly: true,
  })
  id: string;

  @ApiProperty({
    description: 'User email address',
    format: 'email',
    maxLength: 50,
  })
  @IsEmail()
  @MaxLength(50)
  username: string;

  @ApiProperty({
    description: 'User password',
    type: String,
    maxLength: 50,
    pattern: '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W]).{8,})',
    example: 'Password123!',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @Matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/, {
    message: 'Password too weak',
  })
  password: string;

  @ApiProperty({
    description: 'Date when the user was created',
    readOnly: true,
  })
  readonly created_at: Date;
}
