import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Kanji } from './models/kanji.model';
import { KanjisService } from './services/kanjis.service';

@Module({
  controllers: [],
  providers: [KanjisService],
  imports: [SequelizeModule.forFeature([Kanji])],
})
export class KanjisModule {}
