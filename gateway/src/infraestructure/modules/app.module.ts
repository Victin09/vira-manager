import { Module } from '@nestjs/common';
import { UserModule } from '@infraestructure/modules/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule { }
