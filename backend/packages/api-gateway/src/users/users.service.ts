import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_SERVICE') private readonly client: ClientProxy) {}

  findAllUsers(): Observable<any> {
    return this.client.send('findAllUsers', {});
  }
}