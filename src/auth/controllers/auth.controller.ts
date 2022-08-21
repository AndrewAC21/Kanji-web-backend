import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dtos/auth.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';

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
