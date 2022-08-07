import { Module } from '@nestjs/common';


import { ProfileController } from './controllers/profile.controller';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  controllers: [ProfileController, UsersController],
  providers: [UsersService],
})
export class UsersModule {}
