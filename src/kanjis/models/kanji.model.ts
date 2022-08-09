import { DefaultValuePipe } from '@nestjs/common';
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
  AllowNull,
} from 'sequelize-typescript';

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
  @Column({ allowNull: false })
  takenFrom: string;
  @Default(Sequelize.fn('now'))
  @Column({ field: 'created_at' })
  createdAt: Date;
  @Default(Sequelize.fn('now'))
  @Column({ field: 'created_at' })
  updatedAt: Date;
}
