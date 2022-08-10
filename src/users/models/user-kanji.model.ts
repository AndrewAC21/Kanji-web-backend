import { Column, Table, Model, ForeignKey } from 'sequelize-typescript';
import { Kanji } from 'src/kanjis/models/kanji.model';
import { User } from './user.model';

@Table({ tableName: 'user-kanji' })
export class UserKanji extends Model {
  @ForeignKey(() => User,)
  @Column({ field: 'user_id' })
  userId: number;

  @ForeignKey(() => Kanji)
  @Column({ field: 'kanji_id' })
  kanjiId: number;
}
