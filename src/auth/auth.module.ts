import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import config from 'configs/config';
import { ProfileController } from 'src/auth/controllers/profile.controller';
import { ProfileService } from './services/profile.service';

@Module({
  controllers: [AuthController, ProfileController],
  providers: [AuthService, LocalStrategy, JwtStrategy, ProfileService],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigType<typeof config>) => ({
        secret: configService.jwt.secret,
        signOptions: {
          expiresIn: '1d',
        },
      }),
      inject: [config.KEY],
    }),
  ],
})
export class AuthModule {}
