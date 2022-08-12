import * as Joi from 'joi';

const configSchema = Joi.object({
  PORT: Joi.number().required(),
  DB_DIALECT: Joi.string().required(),

  POSTGRES_URI: Joi.string().uri().required(),
});

export default configSchema;
