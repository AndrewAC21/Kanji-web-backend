import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import config from 'configs/config';

@Injectable()
export class S3Service {
  private static instance: S3Service;
  private client;
  private constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {
    this.client = this.createConnection();
  }
  createConnection() {
    const client = new S3Client({
      region: this.configService.s3.region,
      credentials: {
        accessKeyId: this.configService.s3.publicKey,
        secretAccessKey: this.configService.s3.privateKey,
      },
    });
    return client;
  }
}
