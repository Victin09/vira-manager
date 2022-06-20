import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateProjectDto } from '@vira/kanban/dtos/create-project.dto';
import { CreateListDto } from '@vira/kanban/dtos/create-list.dto';
import { UpdateListDto } from './dtos/update-list.dto';
import { CreateCardDto } from './dtos/create-card.dto';
import { UpdateCardDto } from './dtos/update-card.dto';

@Injectable()
export class KanbanService {
  constructor(@Inject('KANBAN_SERVICE') private readonly client: ClientProxy) {}

  findAllProjects(userId: string): Observable<any> {
    return this.client.send('findAllProjects', userId);
  }

  findProjectById(userId: string, projectId: string) {
    return this.client.send('findProjectById', {
      userId,
      projectId,
    });
  }

  findCardById(cardId: string) {
    return this.client.send('findCardById', cardId);
  }

  createProject(createProjectDto: CreateProjectDto) {
    return this.client.send('createProject', createProjectDto);
  }

  createList(createListDto: CreateListDto) {
    return this.client.send('createList', createListDto);
  }

  createCard(createCardDto: CreateCardDto) {
    return this.client.send('createCard', createCardDto);
  }

  updateList(listId: string, updateListDto: UpdateListDto) {
    return this.client.send('updateList', { ...updateListDto, id: listId });
  }

  updateCard(cardId: string, updateCardDto: UpdateCardDto) {
    return this.client.send('updateCard', { ...updateCardDto, id: cardId });
  }
}
