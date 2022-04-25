import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@infraestructure/modules/user.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/vm-users'), UserModule],
})
export class AppModule { }
