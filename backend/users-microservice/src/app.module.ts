import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@vira/users/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/vira-manager-users'),
  ],
})
export class AppModule {}
