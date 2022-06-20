export class CreateCardDto {
  name: string;
  description?: string;
  priority: string;
  comments: { user: string; comment: string };
  list: string;
  order?: number;
  users: string[];
}
