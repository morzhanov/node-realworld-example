import { getConnection } from 'typeorm';

interface CacheConfig {
  id: string;
  milliseconds: number;
}

export class CacheService {
  public buildCacheConfig(id: string | number): CacheConfig {
    return {
      id: id.toString(),
      milliseconds: Number.parseInt(process.env.CACHE_LIFETIME, 10),
    };
  }

  public async clearCache(id: string | number) {
    await getConnection().queryResultCache.remove([id.toString()]);
  }
}
