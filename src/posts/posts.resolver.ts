import { Query, Resolver } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './post.entity';

@Resolver(Post)
export class PostResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(returns => Post)
  async getPost(@Args('id') id: number) {
    return await this.postsService.findOneById(id);
  }
}
