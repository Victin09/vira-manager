import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ListsService } from '@vira/lists/lists.service';
import { CreateListDto } from '@vira/lists/dtos/create-list.dto';
import { UpdateListDto } from '@vira/lists/dtos/update-list.dto';

@Controller()
export class ListsController {
  constructor(private readonly listsService: ListsService) {}

  @MessagePattern('createList')
  create(@Payload() createListDto: CreateListDto) {
    return this.listsService.create(createListDto);
  }

  @MessagePattern('updateList')
  update(@Payload() updateListDto: UpdateListDto) {
    return this.listsService.update(updateListDto);
  }
}
