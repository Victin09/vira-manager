export class CreateListDto {
  name: string;
  order?: number;
  archived?: boolean;
  board: string;
  cards: string[];
}
