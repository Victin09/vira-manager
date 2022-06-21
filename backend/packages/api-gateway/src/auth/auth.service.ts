import { map, Observable } from 'rxjs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '@vira/auth/dtos/sign-in.dto';
import { SignUpDto } from '@vira/auth/dtos/sign-up.sto';
import { UserDto } from '@vira/auth/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_MICROSERVICE') private readonly client: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  validateUser(data: SignInDto): Observable<SignInDto> {
    return this.client.send<SignInDto>('validateUser', { ...data });
  }

  signIn(user: SignInDto): Observable<UserDto> {
    return this.client.send<UserDto>('findUserByEmail', user.email).pipe(
      map((user) => {
        return {
          ...user,
          token: this.jwtService.sign({ user: user.email }),
        };
      }),
    );
  }

  signUp(user: SignUpDto): Observable<string> {
    return this.client.send<string>('createUser', user);
  }
}
