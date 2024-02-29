import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv'
async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1/api/');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));


  const config = new DocumentBuilder()
    .setTitle('CLRD API')
    .setDescription('CLRD APIs documentation')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/api', app, document);

  await app.listen(3000);
}
bootstrap();
