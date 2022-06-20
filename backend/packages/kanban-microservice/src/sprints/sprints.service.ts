import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiResponse } from '@vira/common/types/api-response.type';
import { Model } from 'mongoose';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { UpdateSprintDto } from './dto/update-sprint.dto';
import { Sprint, SprintDocument } from './entities/sprint.entity';

@Injectable()
export class SprintsService {
  constructor(
    @InjectModel(Sprint.name)
    private readonly sprintModel: Model<SprintDocument>,
  ) {}

  async create(createSprintDto: CreateSprintDto): Promise<ApiResponse<Sprint>> {
    try {
      const sprintToCreate = new this.sprintModel(createSprintDto);
      const sprint = await sprintToCreate.save();
      return {
        status: HttpStatus.OK,
        message: 'Sprint created',
        data: sprint,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error: Cannot create sprint',
      };
    }
  }

  findAll() {
    return `This action returns all sprints`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sprint`;
  }

  findSprintByProjectId(id: string) {
    return `This action returns a #${id} sprint`;
  }

  update(id: number, updateSprintDto: UpdateSprintDto) {
    return `This action updates a #${id} sprint`;
  }

  remove(id: number) {
    return `This action removes a #${id} sprint`;
  }
}
