import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from '@vira/users/user.service';
import { CreateUserDto } from '@vira/users/dtos/create-user.dto';
import { UpdateUserDto } from '@vira/users/dtos/update-user.dto';
import { ValidateUserDto } from '@vira/users/dtos/validate-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('validateUser')
  validateUser(@Payload() validateUserDto: ValidateUserDto) {
    return this.userService.validateUser(validateUserDto);
  }

  @MessagePattern('findUserByEmail')
  findUserByEmail(@Payload() email: string) {
    return this.userService.findUserByEmail(email);
  }

  @MessagePattern('createUser')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern('findAllUsers')
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: string) {
    return this.userService.findOne(id);
  }

  @MessagePattern('updateUser')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: number) {
    return this.userService.remove(id);
  }
}
