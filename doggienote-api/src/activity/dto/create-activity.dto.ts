import { IsNotEmpty } from "class-validator";

export class CreateActivityDto {
  id: string;

  @IsNotEmpty()
  id_dog: string;

  @IsNotEmpty()
  id_dict_activity: string;

  @IsNotEmpty()
  date_of_activity: Date;
  
  description: string | null;
  activity_duration: number | null;
}
