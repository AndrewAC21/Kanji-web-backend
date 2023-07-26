import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  // todo fix serialization problem
  // app.useGlobalInterceptors(
  //   new ClassSerializerInterceptor(app.get(Reflector), {}),
  // );
  app.enableCors({
    origin: [
      'https://andrewac.software/kanji-app',
      'https://www.andrewac.software',
      'https://andrewac.software'
    ],
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port);
}
bootstrap();
