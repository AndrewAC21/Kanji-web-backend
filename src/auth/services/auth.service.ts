import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/services/users.service';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string) {
    let user = await this.usersService.findByEmail(email);
    if (user) {
      let isCorrectPassword = await bcrypt.compare(pass, user.password);
      if (!isCorrectPassword) return null;
      let { password, ...result } = user;
      return result;
    }
    return null;
  }

  async createJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  /* async disableJWT(token: string) {
    const cleanedTokenString = token.split(' ')[1];

    console.log(cleanedTokenString);
    return true;
  } */
}
