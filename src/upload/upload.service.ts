import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';
import { ConfigService } from '../config/config.service';

@Injectable()
export class UploadService {
  private readonly s3;
  constructor(private readonly configService: ConfigService) {
    this.s3 = new aws.S3();
    aws.config.update({
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_KEY'),
    });
    aws.config.update({ region: 'us-east-2' });
  }

  async createSignedUrl(filename, userId) {
    return this.s3.getSignedUrl('getObject', {
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: `${userId}/${filename}`,
      Expires: 60,
    });
  }
}
