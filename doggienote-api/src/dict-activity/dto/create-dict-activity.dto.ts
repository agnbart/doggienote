export class CreateDictActivityDto {
  id: string;
  dict_activity: string;
  description: string|null;
  removable: boolean = false;
}
