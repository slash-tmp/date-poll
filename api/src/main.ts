import { NestFactory } from '@nestjs/core';
import morgan from 'morgan';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'common'));
  await app.listen(4000);
}
bootstrap();
