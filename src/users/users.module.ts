import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './models/user.model';
import { UserKanji } from './models/user-kanji.model';
import { ProfileController } from './controllers/profile.controller';

@Module({
  controllers: [ProfileController, UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User, UserKanji])],
})
export class UsersModule {}
