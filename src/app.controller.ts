import { Controller, Get, HostParam, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { AuthService } from './auth/services/auth.service';

@Controller() //{ host: 'admin@admin.com' }
export class AppController {

  constructor(@Inject(AuthService) private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req) {
    return this.authService.createJWT(req.user);
  }

  @Post('sign-up')
  createNewUser() {}
}

