import { IsNotEmpty, Length } from 'class-validator';

export class CreateDogDto {
  @IsNotEmpty()
  @Length(2)
  name: string;

  kennel_name: string | null;
  official_name: string | null;

  @IsNotEmpty()
  date_of_birth: Date;

  height_category: string | null;

  @IsNotEmpty()
  id_user: string;
}
