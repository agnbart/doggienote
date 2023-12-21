export class FindActivityDto {
    readonly id: string;
    readonly id_dog: string;
    readonly id_dict_activity: string;
    readonly date_of_activity: Date;
    readonly description: string | null;
    readonly activity_duration: number | null;
  }