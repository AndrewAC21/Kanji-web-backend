export class User {
  id: number;
  email: string;
  password: string;
  fullName: string;

  role: string;

  favKanjis: Array<number>;

  createdAt: Date;

  updatedAt: Date;
}
