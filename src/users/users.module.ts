import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from 'src/database/database.module';

import { ProfileController } from './controllers/profile.controller';
import { UsersController } from './controllers/users.controller';
import { User } from './models/user.model';
import { UsersService } from './services/users.service';

@Module({
  controllers: [ProfileController, UsersController],
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User])],
})
export class UsersModule {}
