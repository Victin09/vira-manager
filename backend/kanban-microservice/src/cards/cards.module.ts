import { Module } from '@nestjs/common';
import { CardsService } from '@vira/cards/cards.service';
import { CardsController } from '@vira/cards/cards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from '@vira/cards/entities/card.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
