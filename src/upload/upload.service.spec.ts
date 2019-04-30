import { Test, TestingModule } from '@nestjs/testing';
import * as aws from 'aws-sdk';

import { UploadService } from './upload.service';
import { ConfigService } from '../config/config.service';

const s3GetSignedUrlReturnValue: any = 'example';
jest.mock(
  'aws-sdk',
  jest.fn(() => ({ S3: jest.fn(), config: { update: jest.fn() } })),
);
jest.mock('../config/config.service');
// @ts-ignore
aws.S3.mockImplementation(() => ({
  getSignedUrl: jest.fn().mockReturnValue(s3GetSignedUrlReturnValue),
}));

describe('UploadService', () => {
  let service: UploadService;
  const configServiceMock = new ConfigService();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
        { provide: 'ConfigService', useValue: configServiceMock },
      ],
    }).compile();

    service = module.get<UploadService>(UploadService);
  });

  it('should be defined', () => {
    const updateData = {
      accessKeyId: configServiceMock.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configServiceMock.get('AWS_SECRET_KEY'),
    };

    expect(service).toBeDefined();
    expect(aws.config.update).toHaveBeenCalledTimes(1);
    expect(aws.config.update).toHaveBeenCalledWith(updateData);
  });

  it('should create singed url', async () => {
    const filename = 'filename';
    const mimetype = 'mimetype';
    const userId = 100;

    const res = await service.createSignedUrl(filename, mimetype, userId);
    expect(res).toEqual(s3GetSignedUrlReturnValue);
  });
});
