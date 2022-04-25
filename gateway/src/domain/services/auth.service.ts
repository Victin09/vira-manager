import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@domain/services/user.service';
// import { SignUpDto } from '@application/dtos/sign-up.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  private logger: Logger;

  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientProxy,
    private jwtService: JwtService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

  async validateUser(email: string, password: string) {
    console.log('calidate');
    const user = this.client.send('validateUser', { email, password });
    console.log({ user });
    return null;
  }

  // async signin(user: any): Promise<{ user: any; token: string }> {
  //   const payload = { email: user.email };
  //   const result = await this.userService.updateLastLogin(user.email);
  //   return {
  //     user: result,
  //     token: this.jwtService.sign(payload),
  //   };
  // }

  // async signup(data: SignUpDto): Promise<string> {
  //   const userExist = await this.userService.findByEmail(data.email);
  //   if (userExist) {
  //     throw new HttpException('Error: user already exist', 409);
  //   }
  //   const user = await this.userService.create(data);
  //   const payload = { email: user.email };
  //   return this.jwtService.sign(payload);
  // }
}