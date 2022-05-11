import {
  Body,
  Controller,
  Post,
  Response as Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@vira/auth/auth.service';
import { SignInDto } from '@vira/auth/dtos/sign-in.dto';
import { LocalAuthGuard } from '@vira/common/guards/local.guard';
import { SignUpDto } from '@vira/auth/dtos/sign-up.sto';
import { Response } from 'express';
import { map } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@Body() data: SignInDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.signIn(data).pipe(
      map((user) => {
        const date = new Date(Date.now());
        date.setDate(date.getDate() + 7);
        res.cookie('token', user.token, {
          httpOnly: true,
          expires: date,
        });
        return user;
      }),
    );
  }

  @Post('sign-up')
  signUp(@Body() data: SignUpDto) {
    return this.authService.signUp(data);
  }
}
