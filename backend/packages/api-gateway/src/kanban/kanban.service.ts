import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';
import { CreateProjectDto } from '@vira/kanban/dtos/create-project.dto';
import { CreateListDto } from '@vira/kanban/dtos/create-list.dto';
import { UpdateListDto } from './dtos/update-list.dto';
import { CreateCardDto } from './dtos/create-card.dto';
import { UpdateCardDto } from './dtos/update-card.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { UsersService } from '@vira/users/users.service';

@Injectable()
export class KanbanService {
  constructor(
    @Inject('KANBAN_SERVICE') private readonly kanbanClient: ClientProxy,
    @Inject('USERS_MICROSERVICE') private readonly usersClient: ClientProxy,
  ) {}

  findAllProjects(userId: string): Observable<any> {
    return this.kanbanClient.send('findAllProjects', userId);
  }

  findProjectById(userId: string, projectId: string) {
    return this.kanbanClient
      .send('findProjectById', {
        userId,
        projectId,
      })
      .pipe(
        map((response) => {
          response.data.users = this.usersClient
            .send('findUsersById', response.data.users)
            .pipe(
              map((users) => {
                return users;
              }),
            );
          // .pipe(
          //   map((usersResponse) => {
          //     console.log({ usersResponse });
          //     return usersResponse;
          //   }),
          // );
          // console.log('data', response.data);
          return response;
        }),
      );
  }

  findCardById(cardId: string) {
    return this.kanbanClient.send('findCardById', cardId);
  }

  createProject(createProjectDto: CreateProjectDto) {
    return this.kanbanClient.send('createProject', createProjectDto);
  }

  createList(createListDto: CreateListDto) {
    return this.kanbanClient.send('createList', createListDto);
  }

  createCard(createCardDto: CreateCardDto) {
    return this.kanbanClient.send('createCard', createCardDto);
  }

  updateProject(projectId: string, updateProjectDto: UpdateProjectDto) {
    return this.kanbanClient.send('updateProject', {
      ...updateProjectDto,
      id: projectId,
    });
  }

  updateList(listId: string, updateListDto: UpdateListDto) {
    return this.kanbanClient.send('updateList', {
      ...updateListDto,
      id: listId,
    });
  }

  updateCard(cardId: string, updateCardDto: UpdateCardDto) {
    return this.kanbanClient.send('updateCard', {
      ...updateCardDto,
      id: cardId,
    });
  }
}
