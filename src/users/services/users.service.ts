import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateKanjiDto } from 'src/kanjis/dtos/kanjis.dto';
import { Kanji } from 'src/kanjis/models/kanji.model';
import { KanjisService } from 'src/kanjis/services/kanjis.service';
import { CreateUserDto } from '../dtos/users.dto';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @Inject(KanjisService) private kanjisService: KanjisService,
  ) {}

  async findOne(id: number) {
    let user = await this.userModel.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }
  async createUser(data: CreateUserDto) {
    let newUser = this.userModel.create({ data });
    return newUser;
  }

  async addKanjiToList(userId: number, kanjiData: CreateKanjiDto) {
    let user = await this.findOne(userId);
    let kanji = await this.kanjisService.findOne(kanjiData.pictogram);
    if (!kanji) {
      let newKanji = await this.kanjisService.create(kanjiData);
      user.favorite_kanjis.push(newKanji);
      return user.favorite_kanjis;
    }
    user.favorite_kanjis.push(kanji);
    return user.favorite_kanjis;
  }
}
