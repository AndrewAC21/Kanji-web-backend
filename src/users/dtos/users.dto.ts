import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly fullName: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
