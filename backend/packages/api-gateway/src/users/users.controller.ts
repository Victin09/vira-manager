import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@vira/common/guards/jwt.guard';
import { UsersService } from '@vira/users/users.service';

// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('list')
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  // @Get('list/:usersId')
  // findUsersById(@Param('usersId') usersId: string[]) {
  //   return this.usersService.findUsersById(usersId);
  // }

  @Get(':userId')
  findUserById(@Param('userId') userId: string) {
    return this.usersService.findUserById(userId);
  }
}
