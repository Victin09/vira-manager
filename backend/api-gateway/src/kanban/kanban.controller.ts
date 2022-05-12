import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProjectDto } from '@vira/kanban/dtos/create-project.dto';
import { KanbanService } from '@vira/kanban/kanban.service';

@Controller('kanban')
export class KanbanController {
  constructor(private readonly kanbanService: KanbanService) {}

  @Get('/projects/:userId')
  findAllProjects(@Param('userId') userId: string) {
    return this.kanbanService.findAllProjects(userId);
  }

  @Get('/projects/:userId/:projectId')
  findProjectById(
    @Param('userId') userId: string,
    @Param('projectId') projectId: string,
  ) {
    return this.kanbanService.findProjectById(userId, projectId);
  }

  @Post('/projects')
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.kanbanService.createProject(createProjectDto);
  }
}
