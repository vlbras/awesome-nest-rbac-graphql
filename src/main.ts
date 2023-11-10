import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(process.env.APP_PORT);
  
  Logger.log(
    `Running on http://localhost:${process.env.APP_PORT}`,
    'Bootstrap',
  );
}
bootstrap();
