import * as dotenv from 'dotenv';
import * as path from 'path';
import { ConnectionOptions } from 'typeorm';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';
import { __DirectiveLocation } from 'graphql';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    dotenv.config();
    this.envConfig = process.env;
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  getDbConfig() {
    const cacheConnection = {
      type: 'redis' as 'redis',
      options: {
        host: this.get('REDIS_HOST'),
        port: this.get('REDIS_PORT'),
        password: this.get('REDIS_PASSWORD'),
      },
    };

    const dbConnection: ConnectionOptions = {
      type: 'postgres',
      entities: [User, Post],
      migrations: [path.resolve(__dirname, '..') + '/migrations/*.ts'],
      migrationsRun: false,
      dropSchema: false,
      synchronize: true,
      logging: process.env.NODE_ENV !== 'production',
      cache: cacheConnection,
    };
    const dbConnectionUrl = this.get('DB_CONNECTION_URL');

    if (dbConnectionUrl) {
      Object.assign(dbConnection, {
        url: dbConnectionUrl,
      });
    } else {
      Object.assign(dbConnection, {
        database: this.get('DB_NAME'),
        host: this.get('DB_HOST'),
        port: parseInt(this.get('DB_PORT'), 10),
        username: this.get('DB_USERNAME'),
        password: this.get('DB_PASSWORD'),
      });
    }

    return dbConnection;
  }
}
