import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
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

  async findByEmail(email: string) {
    let user = await this.userModel.findOne({ where: { email }, raw: true });
    if (!user) return false;
    return user;
  }

  async createUser(data: CreateUserDto) {
    const existingEmail = await this.findByEmail(data.email);
    if (existingEmail) throw new ConflictException('Email already in use');

    let newUser = this.userModel.create({
      email: data.email,
      password: this.encryptPassword(data.password),
      fullName: data.fullName,
      role: data.role || 'user',
      favKanjis: [],
    });
    return true;
  }
  encryptPassword(password: string) {
    let encriteptedPassword = bcrypt.hashSync(password, 10);
    return encriteptedPassword;
  }

  // <---------- account specific actions  ---------->
  async addKanjiToListByPictogram(userId: number, kanjiData: CreateKanjiDto) {
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

  async addKanjiToListById(userId: number, kanjiId: number) {
    let user = await this.userModel.findByPk(userId);
    let kanji = await this.kanjisService.findOneById(kanjiId);
    console.log(kanjiId, kanji);
    if (!kanji) throw new NotFoundException('Kanji not found');

    user.$add('favKanjis', kanji);
    return user;
  }

  async removeKanjiFromList(userId: number, kanjiId: number) {
    let user = await this.findOne(userId);
    let kanji = await this.kanjisService.findOneById(kanjiId);

    let favToArray = user.toJSON().favKanjis.map((kanji) => kanji.id);

    if (!kanji || !favToArray.includes(kanji.id))
      throw new NotFoundException('Kanji not found');

    user.$remove('favKanjis', kanji);
    return true;
  }

  async getFavoriteKanjis(userId: number) {
    let user = await this.findOne(userId);

    let favKanjis = user.toJSON().favKanjis;
    const mappedFavorites = favKanjis.map((kanji: Kanji) => {
      let { id, pictogram, meaning, furigana, level, takenFrom } = kanji;
      return {
        id,
        pictogram,
        meaning,
        furigana,
        level,
        takenFrom,
      };
    });
    return mappedFavorites;
  }

  async isFavoriteKanji(userId: number, kanjiId: number) {
    let user = await this.findOne(userId);

    let favKanjis = user.toJSON().favKanjis;

    let favToArray: number[] = favKanjis.map((kanji) => kanji.id);
    return favToArray.includes(kanjiId) ? true : false;
  }
  async updateInfo(id: number, data: UpdateUserDto) {
    let user = await this.findOne(id);
    let dataToUpdate = { ...data };
    if (data.password) {
      let { password, ...rest } = data;
      dataToUpdate = { password: this.encryptPassword(password), ...rest };
    }
    let updatedUser = await this.userModel.update(
      { ...dataToUpdate },
      { where: { id: user.id } },
    ); //todo check if the info is not alreay in user
    if (updatedUser[0] === 0) throw new Error('Could not update the user');
    return true;
  }
}
