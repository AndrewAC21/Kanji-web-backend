import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateKanjiDto } from '../dtos/kanjis.dto';
import { Kanji } from '../models/kanji.model';

@Injectable()
export class KanjisService {
  constructor(@InjectModel(Kanji) private kanjiModel: typeof Kanji) {}

  async findOne(pictogram: string) {
    let kanji = await this.kanjiModel.findOne({ where: { pictogram } });
    if (!kanji) return null;
    return kanji;
  }
  create(data: CreateKanjiDto) {
    return this.kanjiModel.create({ data });
  }
}
