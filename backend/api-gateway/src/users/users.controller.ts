import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@vira/common/guards/jwt.guard';
import { UsersService } from '@vira/users/users.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  findAllUsers() {
    return this.usersService.findAllUsers();
  }
}
