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
    s3: {
      bucketName: process.env.AWS_S3_BUCKET_NAME,
      region: process.env.AWS_S3_REGION,
      privateKey: process.env.AWS_S3_PRIVATE_KEY,
      publicKey: process.env.AWS_S3_PUBLIC_KEY,
    }
  };
});
