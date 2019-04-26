import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsService } from './posts.service';
import { PostResolver } from './posts.resolver';
import { PostRepository } from './post.repository';
import { PubSubModule } from '../pubsub/pubsub.module';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository]),
    PubSubModule,
    CacheModule,
  ],
  providers: [PostsService, PostResolver],
})
export class PostsModule {}
