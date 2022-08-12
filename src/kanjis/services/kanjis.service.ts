import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { CreateKanjiDto } from '../dtos/kanjis.dto';
import { Kanji } from '../models/kanji.model';

@Injectable()
export class KanjisService {
  constructor(@InjectModel(Kanji) private kanjiModel: typeof Kanji) {}

  findAll() {
    return this.kanjiModel.findAll({ include: User });
  }
  async findOne(pictogram: string) {
    let kanji = await this.kanjiModel.findOne({ where: { pictogram } });
    if (!kanji) return null;
    return kanji;
  }
  create(data: CreateKanjiDto) {
    let newKanji = this.kanjiModel.create({
      pictogram: data.pictogram,
      meaning: data.meaning,
      furigana: data.furigana,
      level: data.level,
      takenFrom: data.takenFrom,
    });
    return newKanji;
  }
}
