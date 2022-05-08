import { NestFactory } from '@nestjs/core';
import { AppModule } from '@vira/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://192.168.1.132:8080',
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
