import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize/types';

import config from 'configs/config';
import { DatabaseService } from './services/database.service';

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          dialect: configService.db.dialect as Dialect,
          uri: configService.postgres.uri,
          autoLoadModels: configService.db.autoLoadModels,
          synchronize: true,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [DatabaseService],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
