import { IsBoolean, IsNotEmpty, IsOptional, Length } from "class-validator";

export class CreateDictActivityDto {
  @IsNotEmpty()
  @Length(3)
  dict_activity: string;

  @IsOptional()
  description: string|null;

  @IsNotEmpty()
  @IsBoolean()
  removable: boolean = false;
}
