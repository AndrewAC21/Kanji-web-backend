import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { Role } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/models/roles.model';

import { UsersService } from '../services/users.service';

@UseGuards(JwtGuard, RoleGuard)
@Controller('users')
export class UsersController {
  constructor(@Inject(UsersService) private usersService: UsersService) {}
  @Role(Roles.ADMIN)
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Role(Roles.ADMIN)
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
}
