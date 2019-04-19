import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Post } from './post.entity';
import { PostRepository } from './post.repository';
import { CreatePostInput, PatchPostInput } from './post.inputs';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: PostRepository,
  ) {}

  public async getPostsByAuthor(authorId: number): Promise<Post[]> {
    console.log(authorId);
    return this.postRepository.find({ where: { authorId } });
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

    return this.postRepository.findOne({ id: res.id });
  }

  public async patchPost(postData: PatchPostInput): Promise<Post> {
    const post = await this.postRepository.findOne({ id: postData.id });

    if (!post) {
      throw new Error('Post not exists');
    }

    Object.keys(postData).forEach(key => (post[key] = postData[key]));
    await this.postRepository.save(post);

    return this.findOneById(postData.id);
  }

  public async deletePost(id: number): Promise<void> {
    const post = await this.postRepository.findOne({ id });

    if (!post) {
      throw new Error('Post not exists');
    }

    await this.postRepository.delete({ id });
  }
}
