import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';
import { v4 } from 'uuid';

import { ConfigService } from '../config/config.service';

@Injectable()
export class UploadService {
  private readonly s3;
  constructor(private readonly configService: ConfigService) {
    this.s3 = new aws.S3({ region: 'us-east-2', signatureVersion: 'v4' });
    aws.config.update({
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_KEY'),
    });
  }

  async createSignedUrl(filename: string, mimetype: string, userId: number) {
    return this.s3.getSignedUrl('putObject', {
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: `${userId}/${v4()}_${filename}`,
      Expires: 60 * 5,
      ContentType: mimetype,
      ACL: 'public-read',
    });
  }
}
