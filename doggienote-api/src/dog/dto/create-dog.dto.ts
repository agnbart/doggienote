import { IsEmpty, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDogDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  kennel_name: string | null;

  @IsOptional()
  official_name: string | null;

  @IsOptional()
  height_category: string | null;

  @IsNotEmpty()
  id_user: string;
}
