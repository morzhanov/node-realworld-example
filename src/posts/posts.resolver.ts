import { Query, Resolver, Mutation } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { CreatePostInput, PatchPostInput } from './post.inputs';

@Resolver(Post)
export class PostResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(returns => Post)
  async getPost(@Args('id') id: number) {
    return await this.postsService.findOneById(id);
  }

  @Query(returns => [Post])
  async getPostsByAuthor(@Args('authorId') authorId: number) {
    return await this.postsService.getPostsByAuthor(authorId);
  }

  @Mutation(returns => Post)
  async createPost(@Args('createPostData') createPostData: CreatePostInput) {
    return await this.postsService.addPost(createPostData);
  }

  @Mutation(returns => Post)
  async patchPost(@Args('patchPostData') patchPostData: PatchPostInput) {
    return await this.postsService.patchPost(patchPostData);
  }

  @Mutation(returns => Post)
  async deletePost(@Args('postId') postId: number) {
    return await this.postsService.deletePost(postId);
  }
}
