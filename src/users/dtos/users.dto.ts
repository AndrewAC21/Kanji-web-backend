import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;
  @IsNotEmpty()
  @IsString()
  readonly fullName: string;
  @IsOptional()
  @IsString()
  readonly role?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
