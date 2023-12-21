export class CreateDogDto {
    readonly name: string;
    readonly kennel_name?: string;
    readonly official_name?: string;
    readonly date_of_birth: Date;
    readonly height_category: string;
    readonly id_user: string;
  }