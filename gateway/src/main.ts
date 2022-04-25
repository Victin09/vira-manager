import { NestFactory } from '@nestjs/core';
// import { Transport } from '@nestjs/microservices';
import { AppModule } from '@infraestructure/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.connectMicroservice({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://rabbitmq:5672'],
  //     queue: 'gateway',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });

  // await app.startAllMicroservices();
  await app.listen(3001);
}

bootstrap();
