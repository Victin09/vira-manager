import { Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiResponse } from '@vira/common/types/api-response.type';
import { CreateProjectDto } from '@vira/projects/dtos/create-project.dto';
import { UpdateProjectDto } from '@vira/projects/dtos/update-project.dto';
import {
  Project,
  ProjectDocument,
} from '@vira/projects/entities/project.entity';
import { FindProjectDto } from '@vira/projects/dtos/find-project.dto';
import { RemoveProjectDto } from '@vira/projects/dtos/remove-project.dto';
import { CardsService } from '@vira/cards/cards.service';
import { getInitials } from '@vira/utils/text.util';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
    private readonly cardService: CardsService,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
  ): Promise<ApiResponse<Project>> {
    try {
      const projectToCreate = new this.projectModel({
        ...createProjectDto,
        code: getInitials(createProjectDto.name),
      });
      const project = await projectToCreate.save();
      return {
        status: HttpStatus.CREATED,
        message: 'Project created',
        data: project,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error: Cannot create project',
      };
    }
  }

  async findAllByUserId(userId: string): Promise<ApiResponse<any>> {
    try {
      const projects = await this.projectModel.find({ users: userId });
      const cards = await this.cardService.findByUser(userId);
      console.log('cards', cards);
      return {
        status: HttpStatus.OK,
        message: 'Projects found',
        data: { projects: projects, cards: cards.data },
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error: Cannot find projects',
      };
    }
  }

  async findById(findProjectDto: FindProjectDto): Promise<ApiResponse<any>> {
    try {
      console.log('projectId', findProjectDto.projectId);
      const project = await this.projectModel.aggregate([
        {
          $match: {
            _id: findProjectDto.projectId,
            users: findProjectDto.userId,
          },
        },
        {
          $lookup: {
            from: 'lists',
            let: { board: '$_id' },
            pipeline: [
              { $match: { $expr: { $eq: ['$board', '$$board'] } } },
              { $sort: { order: 1 } },
              {
                $lookup: {
                  from: 'cards',
                  let: { list: '$_id' },
                  pipeline: [
                    { $match: { $expr: { $eq: ['$list', '$$list'] } } },
                    { $sort: { order: 1 } },
                  ],
                  as: 'cards',
                },
              },
            ],
            as: 'lists',
          },
        },
      ]);
      const result = project.reduce((r, c) => Object.assign(r, c), {});
      return {
        status: HttpStatus.OK,
        message: 'Project found',
        data: result,
      };
    } catch (error) {
      console.log('error', error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error: project not found',
      };
    }
  }

  async update(updateProjectDto: UpdateProjectDto): Promise<ApiResponse<any>> {
    try {
      const project = await this.projectModel.findOneAndUpdate(
        { _id: updateProjectDto.id, users: updateProjectDto.users },
        { ...updateProjectDto },
      );
      return {
        status: HttpStatus.OK,
        message: 'Project updated',
        data: project,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error: Cannot update project',
      };
    }
  }

  async remove(removeProjectDto: RemoveProjectDto): Promise<ApiResponse<void>> {
    try {
      await this.projectModel.findOneAndUpdate(
        { _id: removeProjectDto.projectId, users: removeProjectDto.userId },
        { archived: true },
      );
      return {
        status: HttpStatus.OK,
        message: 'Project archived',
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error: Cannot remove project',
      };
    }
  }
}
