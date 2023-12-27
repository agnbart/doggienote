import { PartialType } from "@nestjs/mapped-types";
import { CreateActivityDto } from "./create-activity.dto";

export class FindActivityDto extends PartialType(CreateActivityDto){}