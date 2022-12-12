module.exports = {
  development: {
    url: process.env.POSTGRES_URI,
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
