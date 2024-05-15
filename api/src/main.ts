import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import morgan from 'morgan';

import { AppModule } from './app.module';

const PORT = 4000;
const isProductionStage = process.env.STAGE === 'production';
const isProductionEnv = process.env.NODE_ENV === 'production';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Date Poll API')
    .setVersion('DEV')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  console.dir(document, { depth: null });
  SwaggerModule.setup('/api/swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(morgan(isProductionEnv ? 'common' : 'dev'));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  if (!isProductionStage) setupSwagger(app);

  await app.listen(PORT);
  console.log(`API server running on port ${PORT}`);
}
bootstrap();
