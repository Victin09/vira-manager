export class CreateCardDto {
  name: string;
  description?: string;
  list: string;
  order?: number;
  users: string[];
}
