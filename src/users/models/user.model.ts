import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
  Unique,
  Default,
} from 'sequelize-typescript';

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

  @Column({field: 'favorite_kanji'})
  favoriteKanji: Array<number>

  @Column({ field: 'created_at', defaultValue: Sequelize.fn('now') })
  creationDate: Date;

  @Default(Sequelize.fn('now'))
  @Column({ field: 'updated_at' })
  updatedAt: Date;
  @Default(Sequelize.fn('now'))
  @Column({ field: 'deleted_at' })
  deletedAt: Date;
}
