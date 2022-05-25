export class CreateListDto {
  name: string;
  order: number;
  archived?: boolean;
  cards: string[];
}
