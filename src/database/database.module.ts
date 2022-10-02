import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize/types';

import config from 'configs/config';
import { DatabaseService } from './services/database.service';
import { Kanji } from 'src/kanjis/models/kanji.model';
import { User } from 'src/users/models/user.model';
import { UserKanji } from 'src/users/models/user-kanji.model';

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          dialect: configService.db.dialect as Dialect,
          uri: configService.postgres.uri,
          models: [User, Kanji, UserKanji],
          synchronize: false,
          logging: false,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [DatabaseService],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
