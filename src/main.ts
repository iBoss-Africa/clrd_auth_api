import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {

  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule,{
  });

  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors();

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

  await app.listen(configService.get('PORT'));
  logger.log(`Application running to port: ${configService.get('PORT')}`);

}
bootstrap();
