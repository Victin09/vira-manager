import { Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCardDto } from '@vira/cards/dtos/create-card.dto';
import { UpdateCardDto } from '@vira/cards/dtos/update-card.dto';
import { ApiResponse } from '@vira/common/types/api-response.type';
import { Card } from '@vira/cards/entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card.name) private readonly cardModel: Model<Card>,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<ApiResponse<Card>> {
    try {
      const order = await this.cardModel.countDocuments({
        list: createCardDto.list,
      });
      const cardToCreate = new this.cardModel({
        ...createCardDto,
        order: order + 1,
      });
      const card = await cardToCreate.save();
      return {
        status: HttpStatus.CREATED,
        message: 'Card created',
        data: card,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error: Cannot create card',
      };
    }
  }

  async findOne(id: string): Promise<ApiResponse<Card>> {
    try {
      const card = await this.cardModel.findById(id);
      return {
        status: HttpStatus.OK,
        message: 'Card found',
        data: card,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error: Cannot find card',
      };
    }
  }

  async update(updateCardDto: UpdateCardDto): Promise<ApiResponse<Card>> {
    try {
      const card = await this.cardModel.findByIdAndUpdate(
        updateCardDto.id,
        { ...updateCardDto },
        { new: true },
      );
      return {
        status: HttpStatus.OK,
        message: 'Card updated',
        data: card,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error: Cannot update card',
      };
    }
  }

  async remove(id: string): Promise<ApiResponse<Card>> {
    try {
      const card = await this.cardModel.findByIdAndDelete(id);
      return {
        status: HttpStatus.OK,
        message: 'Card deleted',
        data: card,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error: Cannot delete card',
      };
    }
  }
}
