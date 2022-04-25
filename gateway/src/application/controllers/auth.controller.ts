import { SignInDto } from "@application/dtos/sign-in.dto";
import { LocalAuthGuard } from "@domain/guards/local.guard";
import { AuthService } from "@domain/services/auth.service";
import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { Observable } from "rxjs";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  singIn(@Body() data: SignInDto) {
    return this.authService.validateUser(data.email, data.password);
  }
}