import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiResponse } from '@vira/common/types/api-response.type';
import { Model } from 'mongoose';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board, BoardDocument } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectModel(Board.name)
    private readonly boardModel: Model<BoardDocument>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    try {
      const boardToCreate = new this.boardModel({
        ...createBoardDto,
      });
      const board = await boardToCreate.save();
      return board;
    } catch (error) {
      throw new Error('Error: Cannot create board');
    }
  }

  findAll() {
    return `This action returns all boards`;
  }

  async findByProjectId(projectId: string): Promise<Board> {
    try {
      const board = await this.boardModel.findOne({ projectId });
      return board;
    } catch (error) {
      throw new Error('Error: Cannot find board');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
