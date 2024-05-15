import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFile } from 'fs/promises';
import openapiTS, { OpenAPI3 } from 'openapi-typescript';
import { resolve } from 'path';

import { AppModule } from '../src/app.module';

async function main() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Date Poll API')
    .setVersion('DEV')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  const ast = await openapiTS(document as OpenAPI3);
  await writeFile(resolve(process.cwd(), './date-poll-api.ts'), ast, {
    encoding: 'utf-8',
  });
}

main();
