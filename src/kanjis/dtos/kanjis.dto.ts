import { IsString, IsNotEmpty } from 'class-validator';
export class CreateKanjiDto {
  @IsNotEmpty()
  @IsString()
  readonly pictogram: string;
  @IsNotEmpty()
  @IsString()
  readonly meaning: string;
  @IsNotEmpty()
  @IsString()
  readonly hiragana: string;
  @IsNotEmpty()
  @IsString()
  readonly furigana: string;
  @IsNotEmpty()
  @IsString()
  readonly level: string;
  @IsNotEmpty()
  @IsString()
  readonly takenFrom: string;
}
