import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateKanjiDto } from '../dtos/kanjis.dto';
import { KanjisService } from '../services/kanjis.service';

@Controller('kanjis')
export class KanjisController {
  constructor(@Inject(KanjisService) private kanjisService: KanjisService) {}
  @Get()
  getKanjis() {
    
    return this.kanjisService.findAll();
  }

  @Post('/create-kanji')
  createKanji(@Body() payload: CreateKanjiDto) {
    return this.kanjisService.create(payload);
  }


}
