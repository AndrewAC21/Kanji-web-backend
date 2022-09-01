import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    db: {
      dialect: process.env.DB_DIALECT,
      autoLoadModels: process.env.DB_LOAD_MODELS === 'true',
    },
    postgres: {
      uri: process.env.POSTGRES_URI,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  };
});
