import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsService } from './posts.service';
import { PostResolver } from './posts.resolver';
import { PostRepository } from './post.repository';
import { PubSubModule } from '../pubsub/pubsub.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository]), PubSubModule],
  providers: [PostsService, PostResolver],
})
export class PostsModule {}
