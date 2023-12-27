import { PartialType } from "@nestjs/mapped-types";
import { CreateDictActivityDto } from "./create-dict-activity.dto";

export class FindDictActivityDto extends PartialType(CreateDictActivityDto){}
