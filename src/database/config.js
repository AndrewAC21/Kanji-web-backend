module.exports = {
  development: {
    url: 'postgres://admin:root@localhost:5432/kanji_web_db',
    dialect: 'postgres',
  },
  production: {
    url: process.env.POSTGRES_URI,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
