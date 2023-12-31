import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateActivityDto {
  @IsNotEmpty()
  id_dog: string;

  @IsNotEmpty()
  id_dict_activity: string;

  @IsOptional()
  date_of_activity: Date | null;
  
  @IsNotEmpty()
  description: string;

  @IsOptional()
  activity_duration: number | null;
}
