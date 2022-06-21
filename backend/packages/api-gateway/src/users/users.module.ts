import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersService } from '@vira/users/users.service';
import { UsersController } from '@vira/users/users.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 1209,
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
