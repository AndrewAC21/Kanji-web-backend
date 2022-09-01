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
} from '@nestjs/common';

import { Response } from 'express';
import { UsersService } from 'src/users/services/users.service';

import { JwtGuard } from '../../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('profile')
export class ProfileController {
  //todo create a private var of the userId taken from the JWT token

  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
  ) {}

  @Get()
  getUserProfile(@Request() req) {
    console.log(req.user, 'req.user');
    return req.user;
  }

  @Delete('favorites/:kanjiId')
  getFavoriteKanjis() {}
  async removeKanjiFromFavs(
    @Req() req,
    @Param('kanjiId', ParseIntPipe) kanjiId: number,
    @Res() res: Response,
  ) {
    let response = await this.usersService.removeKanjiFromList(
      req.user.id,
      kanjiId,
    );
    if (response) {
      return res
        .status(HttpStatus.OK)
        .json({ status: 'ok', message: 'Kanji removed from favorites' });
    }
  }
  @Get('settings')
  showSettings() {}

  @Put('settings')
  changeSettings() {}
}
