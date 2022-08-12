import { DefaultValuePipe } from '@nestjs/common';
import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
  Unique,
  Default,
  AllowNull,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserKanji } from 'src/users/models/user-kanji.model';
import { User } from 'src/users/models/user.model';

//TODO create level table 1:M with kanji
@Table({ tableName: 'kanjis' })
export class Kanji extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  pictogram: string;
  @Column({ allowNull: false })
  meaning: string;

  @Column({ allowNull: false })
  furigana: string;
  @Column({ allowNull: false })
  level: string;
  @Column({ allowNull: false, field: 'taken_from' })
  takenFrom: string;
  @BelongsToMany(() => User, () => UserKanji)
  in_users_list: User[];
  //todo exclude createdAt and updatedAt fields from the response
  @Default(Sequelize.fn('now'))
  @Column({ field: 'created_at' })
  createdAt: Date;
  @Default(Sequelize.fn('now'))
  @Column({ field: 'updated_at' })
  updatedAt: Date;
}
