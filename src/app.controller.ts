import {
  Body,
  Controller,
  Get,
  HostParam,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { JwtGuard } from './auth/guards/jwt.guard';
import { AuthService } from './auth/services/auth.service';
import { CreateUserDto } from './users/dtos/users.dto';
import { UsersService } from './users/services/users.service';
import { Request, Response } from 'express';

@Controller() //{ host: 'admin@admin.com' }
export class AppController {
  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(UsersService) private UserService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res() res) {
    try {
      const token = await this.authService.createJWT(req.user);
      return res.status(200).json({ token });
    } catch (e) {
      console.log('error en login');
      return res.status(e.status).json(e.response);
    }
  }

  @Post('sign-up')
  async createNewUser(@Body() data: CreateUserDto, @Res() res: Response) {
    try {
      const newUser = await this.UserService.createUser(data);
      return res.status(201).json({ message: 'User created successfully' });
    } catch (e) {
      console.log('error en el sign up');
      console.log(e);
      return res.status(400).json(e.response);
    }
  }

  /*   @UseGuards(JwtGuard)
  @Post('logout')
  async logout(@Req() req: Request, @Res() res) {
    const token = req.headers.authorization;
    const i = await this.authService.disableJWT(token);
  }  */
}
