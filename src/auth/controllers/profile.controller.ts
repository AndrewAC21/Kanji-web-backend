import {
  Controller,
  Get,
  Put,
  Delete,
  UseGuards,
  Request,
  Param,
  Res,
  HttpStatus,
  Inject,
  Req,
  ParseIntPipe,
  forwardRef,
  Post,
  Body,
} from '@nestjs/common';

import { Response } from 'express';
import { CreateKanjiDto } from 'src/kanjis/dtos/kanjis.dto';
import { UpdateUserDto } from 'src/users/dtos/users.dto';
import { UsersService } from 'src/users/services/users.service';

import { JwtGuard } from '../../auth/guards/jwt.guard';
import { PayloadToken } from '../models/token.model';

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}

  @Get()
  async showSettings(@Req() req) {
    console.log(req.user);
    let user = await this.usersService.findOne(req.user.userId);

    let { email, fullName } = user;

    return {
      status: 'ok',
      message: {
        email,
        fullName,
      },
    };
  }

  @Put()
  async updateInfo(
    @Req() req,
    @Body() payload: UpdateUserDto,
    @Res() res: Response,
  ) {
    let response = await this.usersService.updateInfo(req.user.userId, payload);

    return res
      .status(HttpStatus.OK)
      .json({ status: 'ok', message: 'User updated' });
  }

  @Get('favorites')
  getFavoriteKanjis(@Req() req) {
    return this.usersService.getFavoriteKanjis(req.user.userId);
  }

  @Post('favorite')
  addKanji(
    @Body()
    { userId, kanjiData }: { userId: number; kanjiData: CreateKanjiDto },
  ) {
    return this.usersService.addKanjiToList(userId, kanjiData);
  }

  @Delete('favorites/:kanjiId')
  async removeKanjiFromFavs(
    @Req() req,
    @Param('kanjiId', ParseIntPipe) kanjiId: number,
    @Res() res: Response,
  ) {
    let response = await this.usersService.removeKanjiFromList(
      req.user.userId,
      kanjiId,
    );
    if (response) {
      return res
        .status(HttpStatus.OK)
        .json({ status: 'ok', message: 'Kanji removed from favorites' });
    }
  }
}
