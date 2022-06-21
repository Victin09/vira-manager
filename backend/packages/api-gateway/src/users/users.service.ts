import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MICROSERVICE') private readonly client: ClientProxy,
  ) {}

  findAllUsers(): Observable<any> {
    return this.client.send('findAllUsers', {});
  }

  findUsersById(usersId: string[]): Observable<any> {
    return this.client.send('findUsersById', usersId);
  }

  findUserById(userId: string): Observable<any> {
    return this.client.send('findOneUser', userId);
  }
}
