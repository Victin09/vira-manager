import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateProjectDto } from '@vira/kanban/dtos/create-project.dto';

@Injectable()
export class KanbanService {
  constructor(@Inject('KANBAN_SERVICE') private readonly client: ClientProxy) {}

  findAllProjects(userId: string): Observable<any> {
    return this.client.send('findAllProjects', { userId });
  }

  findProjectById(userId: string, projectId: string) {
    return this.client.send('findProjectById', { userId, projectId });
  }

  createProject(createProjectDto: CreateProjectDto) {
    this.client.send('createProject', createProjectDto);
  }
}
