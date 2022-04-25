import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common'
import { AppModule } from '@infraestructure/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 8080,
    },
  });
  await app.listen();
  Logger.log('Users microservice is UP and LISTENING');
}

bootstrap();
