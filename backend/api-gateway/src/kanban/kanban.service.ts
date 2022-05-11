import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class KanbanService {
  constructor(@Inject('KANBAN_SERVICE') private readonly client: ClientProxy) {}

  findAllProjects(userId: string): Observable<any> {
    return this.client.send('findAllProjects', { userId });
  }
}
