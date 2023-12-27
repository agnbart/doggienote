import { PartialType } from "@nestjs/mapped-types";
import { CreateDogDto } from "./create-dog.dto";

export class FindDogDto extends PartialType(CreateDogDto){
  readonly id: string;
}
