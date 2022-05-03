import { Module } from '@nestjs/common';
import { AuthModule } from '@vira/auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
})
export class AppModule {}
