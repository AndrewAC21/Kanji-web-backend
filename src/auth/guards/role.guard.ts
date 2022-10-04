import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Roles } from '../models/roles.model';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.get<Roles>(ROLES_KEY, context.getHandler());
    const req = context.switchToHttp().getRequest();
    const userToken: PayloadToken = req.user;

    return userToken.role === role;
  }
}
