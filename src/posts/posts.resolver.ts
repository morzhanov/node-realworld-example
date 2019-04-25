import {
  Args,
  Query,
  Resolver,
  Mutation,
  Context,
  Subscription,
} from '@nestjs/graphql';

import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { CreatePostInput, PatchPostInput } from './post.inputs';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql.auth.guard';
import { PubSubService } from '../pubsub/pubsub.service';
import { ConfigService } from '../config/config.service';

@Resolver(Post)
export class PostResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly configService: ConfigService,
    private readonly pubSubService: PubSubService,
  ) {}

  @UseGuards(new GqlAuthGuard('jwt'))
  @Query(returns => Post)
  async getPost(@Args('id') id: number) {
    return this.postsService.findOneById(id);
  }

  @UseGuards(new GqlAuthGuard('jwt'))
  @Query(returns => [Post])
  async getPosts(@Context() ctx: any) {
    return this.postsService.getPostsByAuthor(ctx.user.id);
  }

  @UseGuards(new GqlAuthGuard('jwt'))
  @Mutation(returns => Post)
  async createPost(
    @Args('createPostData') createPostData: CreatePostInput,
    @Context() ctx: any,
  ) {
    const post = await this.postsService.addPost(createPostData, ctx.user.id);
    this.pubSubService.getPubSub().publish('POST_ADDED', { postAdded: post });
    return post;
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

  @Subscription(returns => Post)
  postAdded() {
    return this.pubSubService.getPubSub().asyncIterator('POST_ADDED');
  }
}
