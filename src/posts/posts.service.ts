import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './post.entity';
import { User } from '../users/user.entity';
import { PostRepository } from './post.repository';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: PostRepository,
  ) {}

  public async getPosts(): Promise<Post[]> {
    return this.postRepository.find();
  }

  public async findOneById(id: number): Promise<Post> {
    return this.postRepository.findOne({ id });
  }
}
