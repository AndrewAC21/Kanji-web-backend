import { Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from '../services/auth.service';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req) {
    return this.authService.createJWT(req.user);
  }

  @Post('sign-up')
  createNewUser() {}
}
