import { Module } from '@nestjs/common';
import { AuthModule } from '@vira/auth/auth.module';
import { UsersModule } from './users/users.module';
import { KanbanModule } from './kanban/kanban.module';

@Module({
  imports: [AuthModule, UsersModule, KanbanModule],
})
export class AppModule {}
