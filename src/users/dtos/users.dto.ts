import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly fullName: string;
  readonly role?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
