import { Observable } from 'rxjs';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from '@domain/services/user.service';
import { JwtAuthGuard } from '@domain/guards/jwt.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getUsers(): Observable<any> {
    return this.userService.getUsers();
  }
}
