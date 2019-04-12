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
    return this.postRepository.find({ where: { author: authorId } });
  }

  public async findOneById(id: number): Promise<Post> {
    return this.postRepository.findOne({ id });
  }

  public async addPost(postData: CreatePostInput): Promise<Post> {
    return this.postRepository.create(postData);
  }

  public async patchPost(postData: PatchPostInput): Promise<void> {
    await this.postRepository.update({ id: postData.id }, postData);
  }

  public async deletePost(id: number): Promise<void> {
    await this.postRepository.delete({ id });
  }
}
