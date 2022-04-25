import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from '@application/controllers/user.controller';
import { UserService } from '@domain/services/user.service';
import { User, UserSchema } from '@infraestructure/models/user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
