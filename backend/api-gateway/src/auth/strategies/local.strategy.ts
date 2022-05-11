import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@vira/auth/auth.service';
import { lastValueFrom, throwIfEmpty } from 'rxjs';
import { SignInDto } from '@vira/auth/dtos/sign-in.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<SignInDto> {
    return await lastValueFrom(
      this.authService
        .validateUser({ email, password })
        .pipe(throwIfEmpty(() => new UnauthorizedException())),
    );
  }
}
