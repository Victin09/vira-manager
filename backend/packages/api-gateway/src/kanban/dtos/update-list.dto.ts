import { PartialType } from '@nestjs/mapped-types';
import { CreateListDto } from '@vira/kanban/dtos/create-list.dto';

export class UpdateListDto extends PartialType(CreateListDto) {
  id: string;
  order: number;
}
