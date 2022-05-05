import { NestFactory } from '@nestjs/core';
import { AppModule } from '@vira/app.module';
import { ExceptionFilter } from '@vira/common/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen(3000);
}
bootstrap();
