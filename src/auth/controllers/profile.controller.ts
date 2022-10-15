import {
  Controller,
  Get,
  Put,
  Delete,
  UseGuards,
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

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}

  @Get('settings')
  async showSettings(@Req() req, @Res() res: Response) {
    let user = await this.usersService.findOne(req.user.userId);
    let { email, fullName } = user;
    return res.status(HttpStatus.OK).json({ email, fullName });
  }

  @Put('settings')
  async updateInfo(
    @Req() req,
    @Body() payload: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      let response = await this.usersService.updateInfo(
        req.user.userId,
        payload,
      );

      return res.status(HttpStatus.OK).json({ message: 'User updated' });
    } catch (e) {
      console.log('error actualizando usuario');
      return res.status(e.status).json(e.response);
    }
  }

  @Get('favorites')
  getFavoriteKanjis(@Req() req) {
    return this.usersService.getFavoriteKanjis(req.user.userId);
  }

  @Post('favorites')
  async addKanji(
    @Req() req,
    @Body('kanjiId') kanjiId: number,
    @Res() res: Response,
  ) {
    try {
      const added = await this.usersService.addKanjiToListById(
        req.user.userId,
        kanjiId,
      );
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Kanji added to favorites' });
    } catch (e) {
      console.log('error agregando fav kanji');
      return res.status(e.status).json(e.response);
    }
  }

  @Delete('favorites')
  async removeKanjiFromFavs(
    @Req() req,
    @Body('kanjiId', ParseIntPipe) kanjiId: number,
    @Res() res: Response,
  ) {
    try {
      let response = await this.usersService.removeKanjiFromList(
        req.user.userId,
        kanjiId,
      );
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Kanji removed from favorites' });
    } catch (e) {
      console.log('error eliminando fav kanji');
      return res.status(e.status).json(e.response);
    }
  }
  @Get('is-favorite/:kanjiId')
  async isFavorite(
    @Req() req,
    @Param('kanjiId', ParseIntPipe) kanjiId: number,
  ) {
    return this.usersService.isFavoriteKanji(req.user.userId, kanjiId);
  }
}
