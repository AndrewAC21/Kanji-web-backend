import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './models/user.model';
import { UserKanji } from './models/user-kanji.model';
import { ProfileController } from './controllers/profile.controller';
import { KanjisModule } from 'src/kanjis/kanjis.module';

@Module({
  controllers: [ProfileController, UsersController],
  providers: [UsersService],
  imports: [KanjisModule, SequelizeModule.forFeature([User, UserKanji])],
})
export class UsersModule {}
