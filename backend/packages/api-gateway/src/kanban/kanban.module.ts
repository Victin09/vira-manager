import { Module } from '@nestjs/common';
import { KanbanService } from './kanban.service';
import { KanbanController } from './kanban.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersService } from '@vira/users/users.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KANBAN_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 8081,
        },
      },
    ]),
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
    // UsersService,
  ],
  controllers: [KanbanController],
  providers: [KanbanService],
})
export class KanbanModule {}
