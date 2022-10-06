import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { KanjisModule } from './kanjis/kanjis.module';
import config from 'configs/config';
import configSchema from 'configs/configSchema';
import { AuthService } from './auth/services/auth.service';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    DatabaseModule,
    KanjisModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      validationSchema: configSchema,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
