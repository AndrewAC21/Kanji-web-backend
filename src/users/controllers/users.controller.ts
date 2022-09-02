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
  Delete,
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

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
}
