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
      'https://andrewac21.github.io',
      'http://andrewac.software/kanji-app',
      'http://andrewac.software',
      'http://www.andrewac.software'
    ],
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port);
}
bootstrap();
