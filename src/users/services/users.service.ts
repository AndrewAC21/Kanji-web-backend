import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { CreateKanjiDto } from 'src/kanjis/dtos/kanjis.dto';
import { Kanji } from 'src/kanjis/models/kanji.model';
import { KanjisService } from 'src/kanjis/services/kanjis.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { User } from '../models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @Inject(KanjisService) private kanjisService: KanjisService,
  ) {}
  //todo turn all the responses into json responses

  async findAll() {
    let users = await this.userModel.findAll({
      order: [['id', 'ASC']],
      include: Kanji,
    });
    return users;
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
      password: this.encryptPassword(data.password),
      fullName: data.fullName,
      role: data.role || 'user',
      favKanjis: [],
    });
    return newUser;
  }

  async addKanjiToList(userId: number, kanjiData: CreateKanjiDto) {
    let user = await this.userModel.findByPk(userId);
    let kanji = await this.kanjisService.findOneByPictpgram(
      kanjiData.pictogram,
    );
    if (!kanji) {
      let newKanji = await this.kanjisService.create(kanjiData);
      user.$add('favKanjis', newKanji);
      return user;
    }
    user.$add('favKanjis', kanji);
    return user;
  }

  async removeKanjiFromList(userId: number, kanjiId: number) {
    let user = await this.findOne(userId);
    let kanji = await this.kanjisService.findOneById(kanjiId);

    let favToArray = user.toJSON().favKanjis.map((kanji) => kanji.id);
    console.log(favToArray);
    console.log(favToArray.includes(kanji.id));

    if (!kanji || !favToArray.includes(kanji.id))
      throw new NotFoundException('Kanji not found');

    user.$remove('favKanjis', kanji);
    return true;
  }
  async updateInfo(id: number, data: UpdateUserDto) {
    let user = await this.findOne(id);
    let updatedUser = await this.userModel.update(
      { ...data },
      { where: { id: user.id } },
    ); //todo check if the info is not alreay in user
    if (updatedUser[0] === 0) throw new Error('Could not update the user');
    return true;
  }

  encryptPassword(password: string) {
    let encriteptedPassword = bcrypt.hashSync(password, 10);
    return encriteptedPassword;
  }
}
