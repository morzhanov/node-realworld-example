import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useClass: PostRepository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get post by id', async () => {
    const post = await service.findOneById(200);
    expect(post.id).toBe(200);
    expect(post.title).toBeDefined();
  });

  it('should get posts', async () => {
    const post = await service.getPosts();
    expect(post.length).toBeGreaterThan(0);
    expect(post[0].title).toBeDefined();
  });
});
