import { Test, TestingModule } from '@nestjs/testing';
import * as typeorm from 'typeorm';

import { CacheService } from './Cache.service';

jest.mock('typeorm', () => ({
  getConnection: jest
    .fn()
    .mockReturnValue({ queryResultCache: { remove: jest.fn() } } as any),
}));

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheService],
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should build cache config object', () => {
    const milliseconds = Number.parseInt(process.env.CACHE_LIFETIME, 10);
    const id = 1000;

    const res = service.buildCacheConfig(id);

    expect(res.id).toBe(id.toString());
    expect(res.milliseconds).toBe(milliseconds);
  });

  it('should clear cache', async () => {
    const id = 1000;

    await service.clearCache(id);

    expect(
      typeorm.getConnection().queryResultCache.remove,
    ).toHaveBeenCalledTimes(1);
    expect(
      typeorm.getConnection().queryResultCache.remove,
    ).toHaveBeenCalledWith([id.toString()]);
  });
});
