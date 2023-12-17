import { IsNotEmpty } from "class-validator";

export class CompetitionValidation {
    @IsNotEmpty()
    name: string;
}