import { Controller, Get, Inject, Post, Put, Delete, Body,  } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('profile')
export class ProfileController {
  constructor(private usersService: UsersService){}
  @Get()
  getUserProfile() {}

  @Get('favorites')
  getFavoriteKanjis(){}
  @Delete('favorites')
  deleteKanjiFromFavoritesList(){}

  @Get('settings')
  showSettings(){}

  @Put('settings')
  changeSettings(){}

}
