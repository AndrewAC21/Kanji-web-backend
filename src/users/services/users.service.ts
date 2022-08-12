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

  findAll() {
    return this.userModel.findAll({ include: Kanji });
  }
  async findOne(id: number) {
    let user = await this.userModel.findOne({
      where: { id },
      include: Kanji,
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async createUser(data: CreateUserDto) {
    console.log(data);
    let newUser = this.userModel.create({
      email: data.email,
      password: data.password,
      fullName: data.fullName,
      role: data.role,
      favKanjis: [],
    });
    return newUser;
  }

  async addKanjiToList(userId: number, kanjiData: CreateKanjiDto) {
    let user = await this.findOne(userId);
    let kanji = await this.kanjisService.findOne(kanjiData.pictogram);
    if (!kanji) {
      let newKanji = await this.kanjisService.create(kanjiData);
      user.favKanjis = [newKanji] as Kanji[];
      return user.favKanjis;
    }
    await user.update({ favKanjis: [kanji] });
    await user.save();
    return user;
    // console.log(user.favKanjis);
    // user.favKanjis = [...user.favKanjis, kanji];
    // console.log(user.toJSON());
  }
}
