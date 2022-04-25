import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) { }

  getUsers(): Observable<any> {
    return this.client.send('get_users', '');
  }
}
