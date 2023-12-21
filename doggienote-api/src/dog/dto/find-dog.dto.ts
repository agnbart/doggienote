export class FindDogDto {
  readonly id: string;
  readonly name: string;
  readonly kennel_name: string|null;
  readonly official_name: string|null;
  readonly date_of_birth: Date;
  readonly height_category: string|null;
  readonly id_user: string;
}
