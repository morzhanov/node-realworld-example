import { Injectable } from '@nestjs/common';
import { Post } from './post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
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
