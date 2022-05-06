import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from '@vira/app.module';
import { ExceptionFilter } from '@vira/common/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 1209,
      },
    },
  );
  // app.useGlobalFilters(new ExceptionFilter());
  app.listen();
}
bootstrap();
