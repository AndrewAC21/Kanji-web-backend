import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { CreateKanjiDto } from 'src/kanjis/dtos/kanjis.dto';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Post('/create-user')
  createUser(@Body() payload: CreateUserDto) {
    return this.usersService.createUser(payload);
  }

  @Post('/add-kanji')
  addKanji(
    @Body()
    { userId, kanjiData }: { userId: number; kanjiData: CreateKanjiDto },
  ) {
    return this.usersService.addKanjiToList(userId, kanjiData);
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
  @Put('updateInfo/:id') //todo change it to Profile controller
  async updateInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
    @Res() res: Response,
  ) {
    let response = await this.usersService.updateInfo(id, payload);

    return res
      .status(HttpStatus.OK)
      .json({ status: 'ok', message: 'User updated' });
  }
}
