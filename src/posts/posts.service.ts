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
    return new Promise(resolve => {
      const post = new Post();
      post.id = 200;
      post.author = new User();
      post.author.id = 200;
      post.author.email = 'email';
      post.author.name = 'name';
      post.content = 'Content';
      post.title = 'Title';
      post.imageUrl = 'image url';
      post.createAt = new Date();
      post.updatedAt = new Date();
      resolve([post]);
    });
  }

  public async findOneById(id: number): Promise<Post> {
    return new Promise(resolve => {
      const post = new Post();
      post.id = id;
      post.author = new User();
      post.author.id = id;
      post.author.email = 'email';
      post.author.name = 'name';
      post.content = 'Content';
      post.title = 'Title';
      post.imageUrl = 'image url';
      post.createAt = new Date();
      post.updatedAt = new Date();
      resolve(post);
    });
  }
}
