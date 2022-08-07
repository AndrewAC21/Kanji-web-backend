import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { KanjisModule } from './kanjis/kanjis.module';

@Module({
  imports: [AuthModule, UsersModule, DatabaseModule, KanjisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
