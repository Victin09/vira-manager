import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProjectDto } from '@vira/kanban/dtos/create-project.dto';
import { KanbanService } from '@vira/kanban/kanban.service';
import { CreateListDto } from '@vira/kanban/dtos/create-list.dto';
import { UpdateListDto } from '@vira/kanban/dtos/update-list.dto';
import { CreateCardDto } from './dtos/create-card.dto';
import { UpdateCardDto } from './dtos/update-card.dto';

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

  @Get('/cards/:cardId')
  findCardById(@Param('cardId') cardId: string) {
    return this.kanbanService.findCardById(cardId);
  }

  @Post('/projects')
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.kanbanService.createProject(createProjectDto);
  }

  @Post('/lists')
  createList(@Body() createListDto: CreateListDto) {
    return this.kanbanService.createList(createListDto);
  }

  @Post('/cards')
  createCard(@Body() createCardDto: CreateCardDto) {
    return this.kanbanService.createCard(createCardDto);
  }

  @Put('/lists/:listId')
  updpdateList(
    @Param('listId') listId: string,
    @Body() updateListDto: UpdateListDto,
  ) {
    return this.kanbanService.updateList(listId, updateListDto);
  }

  @Put('/cards/:cardId')
  updpdateCard(
    @Param('cardId') cardId: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    return this.kanbanService.updateCard(cardId, updateCardDto);
  }
}
