import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import morgan from 'morgan';

import { AppModule } from './app.module';

const PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'common'));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(PORT);
  console.log(`API server running on port ${PORT}`);
}
bootstrap();
