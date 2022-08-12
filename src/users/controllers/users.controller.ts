import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateKanjiDto } from 'src/kanjis/dtos/kanjis.dto';
import { CreateUserDto } from '../dtos/users.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}
  //todo turn all the responses into json responses
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
}
