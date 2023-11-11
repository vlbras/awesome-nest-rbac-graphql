import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(process.env.APP_PORT);

  Logger.log(
    `Running on http://localhost:${process.env.APP_PORT}`,
    'Bootstrap',
  );
}
bootstrap();
