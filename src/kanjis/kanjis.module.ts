import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Kanji } from './models/kanji.model';
import { KanjisService } from './services/kanjis.service';
import { KanjisController } from './controllers/kanjis.controller';

@Module({
  controllers: [KanjisController],
  providers: [KanjisService],
  imports: [SequelizeModule.forFeature([Kanji])],
  exports: [KanjisService],
})
export class KanjisModule {}
