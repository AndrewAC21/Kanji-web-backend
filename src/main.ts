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
    origin: 'http://127.0.0.1:5173' || 'http://127.0.0.1:3000',
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  console.log(configService, port);

  await app.listen(port);
}
bootstrap();
