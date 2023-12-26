export class CreateDogDto {
  name: string;
  kennel_name: string | null;
  official_name: string | null;
  date_of_birth: Date;
  height_category: string | null;
  id_user: string;
}
