import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from '@vira/cards/dtos/create-card.dto';

export class UpdateCardDto extends PartialType(CreateCardDto) {
  id: string;
}
