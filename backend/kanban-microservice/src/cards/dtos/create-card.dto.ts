export class CreateCardDto {
  name: string;
  description: string;
  listId: string;
  order: number;
  users: string[];
}
