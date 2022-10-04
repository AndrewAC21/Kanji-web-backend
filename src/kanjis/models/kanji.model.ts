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
@Table({ tableName: 'kanjis', timestamps: true })
export class Kanji extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({ allowNull: false })
  declare pictogram: string;
  @Column({ allowNull: false })
  declare meaning: string;

  @Column({ allowNull: false })
  declare furigana: string;
  @Column({ allowNull: false })
  declare level: string;
  @Column({ allowNull: false, field: 'taken_from' })
  declare takenFrom: string;
  @BelongsToMany(() => User, () => UserKanji)
  in_users_list: User[];
  //todo exclude createdAt and updatedAt fields from the response
  // @Default(Sequelize.fn('now'))
  // @Column({ field: 'created_at' })
  // createdAt: Date;
  // @Default(Sequelize.fn('now'))
  // @Column({ field: 'updated_at' })
  // updatedAt: Date;
}
