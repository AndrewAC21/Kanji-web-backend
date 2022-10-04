import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { Role } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/models/roles.model';
import { CreateKanjiDto } from '../dtos/kanjis.dto';
import { KanjisService } from '../services/kanjis.service';

@UseGuards(JwtGuard, RoleGuard)
@Controller('kanjis')
export class KanjisController {
  constructor(@Inject(KanjisService) private kanjisService: KanjisService) {}
  @Public()
  @Get()
  getKanjis() {
    return this.kanjisService.findAll();
  }
  @Role(Roles.ADMIN)
  @Post('/create-kanji')
  createKanji(@Body() payload: CreateKanjiDto) {
    return this.kanjisService.create(payload);
  }
}
