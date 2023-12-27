import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  id: string;

  @IsEmail()
  username: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/, {
    message: 'Password too weak',
  })
  password: string;

  readonly created_at: Date;
}
