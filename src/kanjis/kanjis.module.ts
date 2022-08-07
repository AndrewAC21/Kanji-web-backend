import { Module } from '@nestjs/common';
import { KanjisService } from './services/kanjis.service';

@Module({
  controllers: [],
  providers: [KanjisService],
})
export class KanjisModule {}
