import { SignInDto } from '@application/dtos/sign-in.dto';
import { AuthService } from '@domain/services/auth.service';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @EventPattern('validateUser')
  validateUser(data: SignInDto) {
    this.authService.validateUser(data.email, data.password);
  }
}