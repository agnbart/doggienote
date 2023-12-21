export class UpdateActivityDto {
    id: string;
    id_dog: string;
    id_dict_activity: string;
    date_of_activity: Date;
    description: string | null;
    activity_duration: number | null;
  }