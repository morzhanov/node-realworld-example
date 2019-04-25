import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { PassportModule } from '@nestjs/passport';
import { get, mapKeys } from 'lodash';

import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { MainController } from './main.controller';
import { PubSubModule } from './pubsub/pubsub.module';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedError } from 'type-graphql';

const typeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) =>
    configService.getDbConfig(),
  inject: [ConfigService],
});

const graphQlModule = GraphQLModule.forRoot({
  autoSchemaFile: 'schema.gql',
  context: ({ req }) => ({ ...req }),
  installSubscriptionHandlers: true,
  subscriptions: {
    onConnect: async connectionParams => {
      connectionParams = mapKeys(connectionParams, (_: string, key: string) =>
        key.toLowerCase(),
      );
      const authToken = get(connectionParams, 'authorization', null);
      if (authToken) {
        const configService = new ConfigService();
        const secretOrPrivateKey = configService.get('JWT_SECRET');
        const jwtService = new JwtService({
          secretOrPrivateKey,
          verifyOptions: { algorithms: ['HS256'] },
        });
        const pureToken = authToken.split(' ')[1];
        try {
          return jwtService.verify(pureToken);
        } catch (e) {
          throw new UnauthorizedError();
        }
      }
      throw new UnauthorizedError();
    },
  },
});

@Module({
  imports: [
    typeOrmModule,
    graphQlModule,
    UsersModule,
    PostsModule,
    PassportModule,
    ConfigModule,
    AuthModule,
    UploadModule,
    PubSubModule,
  ],
  controllers: [MainController],
})
export class AppModule {}
