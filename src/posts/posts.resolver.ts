import { Args, Query, Resolver, Mutation, Context } from '@nestjs/graphql';

import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { CreatePostInput, PatchPostInput } from './post.inputs';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql.auth.guard';

@Resolver(Post)
export class PostResolver {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(new GqlAuthGuard('jwt'))
  @Query(returns => Post)
  async getPost(@Args('id') id: number) {
    return this.postsService.findOneById(id);
  }

  @UseGuards(new GqlAuthGuard('jwt'))
  @Query(returns => [Post])
  async getPostsByAuthor(@Args('authorId') authorId: number) {
    return this.postsService.getPostsByAuthor(authorId);
  }

  @UseGuards(new GqlAuthGuard('jwt'))
  @Mutation(returns => Post)
  async createPost(
    @Args('createPostData') createPostData: CreatePostInput,
    @Context() ctx: any,
  ) {
    return this.postsService.addPost(createPostData, ctx.user.id);
  }

  @UseGuards(new GqlAuthGuard('jwt'))
  @Mutation(returns => Post)
  async patchPost(@Args('patchPostData') patchPostData: PatchPostInput) {
    return this.postsService.patchPost(patchPostData);
  }

  @UseGuards(new GqlAuthGuard('jwt'))
  @Mutation(returns => String)
  async deletePost(@Args('postId') postId: number) {
    await this.postsService.deletePost(postId);
    return `Post ${postId} deleted`;
  }
}
