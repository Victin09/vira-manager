import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dtos/create-card.dto';
import { UpdateCardDto } from './dtos/update-card.dto';

@Controller()
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @MessagePattern('createCard')
  create(@Payload() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @MessagePattern('findOneCard')
  findOne(@Payload() id: string) {
    return this.cardsService.findOne(id);
  }

  @MessagePattern('updateCard')
  update(@Payload() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(updateCardDto);
  }

  @MessagePattern('removeCard')
  remove(@Payload() id: string) {
    return this.cardsService.remove(id);
  }
}
