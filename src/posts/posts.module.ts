import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostResolver } from './posts.resolver';

@Module({
  providers: [PostsService, PostResolver],
})
export class PostsModule {}
