import { SetMetadata } from '@nestjs/common';
import { Roles } from '../models/roles.model';

export const ROLES_KEY = 'roles';

export const Role = (role: Roles) => SetMetadata(ROLES_KEY, role);
