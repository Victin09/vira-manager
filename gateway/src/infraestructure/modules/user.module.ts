import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from '@application/controllers/user.controller';
import { UserService } from '@domain/services/user.service';
import { AuthController } from '@application/controllers/auth.controller';
import { AuthService } from '@domain/services/auth.service';
import { LocalStrategy } from '@domain/strategies/local.strategy';
import { JwtStrategy } from '@domain/strategies/jwt.strategy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8080,
        },
      },
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'vira',
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, LocalStrategy, JwtStrategy],
})
export class UserModule { }
