import { Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateListDto } from '@vira/lists/dtos/create-list.dto';
import { UpdateListDto } from '@vira/lists/dtos/update-list.dto';
import { List, ListDocument } from '@vira/lists/entities/list.entity';
import { ApiResponse } from '@vira/common/types/api-response.type';

type Pair = {
  [key: string]: string[];
};

@Injectable()
export class ListsService {
  constructor(
    @InjectModel(List.name) private readonly listModel: Model<ListDocument>,
  ) {}

  async findListsByProject(projectId: string): Promise<Pair> {
    try {
      const result: Pair = {};
      (await this.listModel.find({ board: projectId })).map((list: List) => {
        result[list._id] = [...list.cards];
      });
      return result;
    } catch (error) {
      console.log('error', error);
      return null;
    }
  }

  async create(createListDto: CreateListDto): Promise<ApiResponse<List>> {
    try {
      const order = await this.listModel.countDocuments({
        board: createListDto.board,
      });
      const listToCreate = new this.listModel({
        ...createListDto,
        order: order + 1,
      });
      const list = await listToCreate.save();
      return {
        status: HttpStatus.CREATED,
        message: 'List created',
        data: list,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error: Cannot create list',
      };
    }
  }

  async update(updateListDto: UpdateListDto): Promise<ApiResponse<List>> {
    try {
      const listToUpdate = await this.listModel.findByIdAndUpdate(
        updateListDto.id,
        { ...updateListDto },
        { new: true },
      );
      return {
        status: HttpStatus.OK,
        message: 'List updated',
        data: listToUpdate,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error: Cannot update list',
      };
    }
  }
}
