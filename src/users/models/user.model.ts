import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
  Unique,
  Default,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Exclude, Expose } from 'class-transformer';

import { Kanji } from 'src/kanjis/models/kanji.model';
import { UserKanji } from './user-kanji.model';
import { allow } from 'joi';

@Table({ tableName: 'users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;
  @Unique
  @Column({ allowNull: false })
  declare email: string;
  @Exclude()
  @Column
  declare password: string;
  @Column({ field: 'full_name', allowNull: false })
  declare fullName: string;
  @Column({ defaultValue: 'user' })
  declare role: string;
  @BelongsToMany(() => Kanji, () => UserKanji)
  @Column({ field: 'profile_picture', allowNull: true })
  declare profilePicture: string;
  favKanjis: Kanji[];

  //todo exclude createdAt and updatedAt fields from the response

  // @Column({ field: 'created_at', defaultValue: Sequelize.fn('now') })
  // createdAt: Date;

  // @Default(Sequelize.fn('now'))
  // @Column({ field: 'updated_at' })
  // updatedAt: Date;
  // @Default(Sequelize.fn('now')) //todo fix the time issue
  // @Column({ field: 'deleted_at' })
  // deletedAt: Date;
}
