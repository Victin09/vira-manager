import { Controller, Get, Param } from '@nestjs/common';
import { KanbanService } from './kanban.service';

@Controller('kanban')
export class KanbanController {
  constructor(private readonly kanbanService: KanbanService) {}

  @Get('/projects/:userId')
  findAllProjects(@Param('userId') userId: string) {
    return this.kanbanService.findAllProjects(userId);
  }
}
