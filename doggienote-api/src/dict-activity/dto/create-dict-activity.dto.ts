import { IsNotEmpty, Length } from "class-validator";

export class CreateDictActivityDto {
  id: string;

  @IsNotEmpty()
  @Length(3)
  dict_activity: string;

  description: string|null;

  removable: boolean = false;
}
