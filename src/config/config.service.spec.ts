import { Test, TestingModule } from '@nestjs/testing';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return value', () => {
    const expectedNodeEnv = process.env.NODE_ENV;
    expect(service.get('NODE_ENV')).toBe(expectedNodeEnv);
  });

  it('should return database configuration object', () => {
    const dbConfig = service.getDbConfig();
    expect(dbConfig.migrations).toBeDefined();
    expect(dbConfig.entities).toBeDefined();
    expect(dbConfig.entities.length).toBeGreaterThan(0);
    expect(dbConfig.migrations.length).toBeGreaterThan(0);
    expect(dbConfig.cache).toBeDefined();
    const cache: any = dbConfig.cache;
    expect(cache.type).toBeDefined();
    expect(cache.options).toBeDefined();
  });
});
