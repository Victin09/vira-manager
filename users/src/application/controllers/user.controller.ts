import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UserService } from '@domain/services/user.service';

@Controller()
export class UserController {
  constructor(private readonly appService: UserService) { }

  @EventPattern('get_users')
  getUsers(): string {
    return this.appService.getUsers();
  }
}
