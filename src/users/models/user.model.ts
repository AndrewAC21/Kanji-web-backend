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

import { Kanji } from 'src/kanjis/models/kanji.model';
import { UserKanji } from './user-kanji.model';

@Table({ tableName: 'users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;
  @Unique
  @Column({ allowNull: false })
  email: string;
  @Column
  password: string;
  @Column({ field: 'full_name', allowNull: false })
  fullName: string;
  @Column({ defaultValue: 'user' })
  role: string;

  @BelongsToMany(() => Kanji, () => UserKanji)
  favorite_kanjis: Kanji[];

  @Column({ field: 'created_at', defaultValue: Sequelize.fn('now') })
  createdAt: Date;

  @Default(Sequelize.fn('now'))
  @Column({ field: 'updated_at' })
  updatedAt: Date;
  @Default(Sequelize.fn('now'))
  @Column({ field: 'deleted_at' })
  deletedAt: Date;
}
