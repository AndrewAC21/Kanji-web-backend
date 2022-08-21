import { PartialType } from '@nestjs/mapped-types';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Kanji } from 'src/kanjis/models/kanji.model';

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

@Exclude()
export class UserResponseDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsString()
  email: string;

  @Expose()
  @IsString()
  fullName: string;

  @Expose()
  @IsString()
  role: string;

  @IsArray()
  @ValidateNested()
  @Expose({ toPlainOnly: true })
  @Type(() => Kanji)
  favKanjis: Kanji[];
}
