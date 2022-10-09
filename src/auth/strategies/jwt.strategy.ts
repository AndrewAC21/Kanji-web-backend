import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from 'configs/config';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from '../models/token.model';
import { User } from 'src/users/models/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwt.secret,
    });
  }
  // PassportStrategy es la que valida el token y lo decodifica
  async validate(payload) {
    // Esto lo ejecuta automaticamente, cuando se hace una peticion con el token y lo añade al header de request
    return { userId: payload.sub, role: payload.role };
  }
}
