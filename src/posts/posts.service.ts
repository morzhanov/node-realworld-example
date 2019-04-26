import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Post } from './post.entity';
import { PostRepository } from './post.repository';
import { CreatePostInput, PatchPostInput } from './post.inputs';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: PostRepository,
    private readonly cacheService: CacheService,
  ) {}

  public async getPostsByAuthor(authorId: number): Promise<Post[]> {
    const res = await this.postRepository.find({
      cache: this.cacheService.buildCacheConfig(authorId),
      where: { authorId },
    });
    return res;
  }

  public async findOneById(id: number): Promise<Post> {
    return this.postRepository.findOne({ id });
  }

  public async addPost(
    postData: CreatePostInput,
    authorId: number,
  ): Promise<Post> {
    const post = new Post();
    Object.keys(postData).forEach(key => (post[key] = postData[key]));
    post.authorId = authorId;
    const res = await this.postRepository.save(post);

    await this.cacheService.clearCache(authorId);

    return this.postRepository.findOne({ id: res.id });
  }

  public async patchPost(
    postData: PatchPostInput,
    authorId: number,
  ): Promise<Post> {
    const post = await this.postRepository.findOne({ id: postData.id });

    if (!post) {
      throw new Error('Post not exists');
    }

    Object.keys(postData).forEach(key => (post[key] = postData[key]));
    await this.postRepository.save(post);

    await this.cacheService.clearCache(authorId);

    return this.findOneById(postData.id);
  }

  public async deletePost(id: number, authorId: number): Promise<void> {
    const post = await this.postRepository.findOne({ id });

    if (!post) {
      throw new Error('Post not exists');
    }

    await this.postRepository.delete({ id });
    await this.cacheService.clearCache(authorId);
  }
}
