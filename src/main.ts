import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { PrismaExceptionFilter } from './lib/exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalFilters(new PrismaExceptionFilter());
  
  await app.listen(process.env.PORT);

  Logger.log(`Running on http://localhost:${process.env.PORT}`, 'Bootstrap');
}
bootstrap();
