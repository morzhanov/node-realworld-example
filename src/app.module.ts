import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.getDbConfig(),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({ autoSchemaFile: 'schema.gql' }),
    UsersModule,
    PostsModule,
    ConfigModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
