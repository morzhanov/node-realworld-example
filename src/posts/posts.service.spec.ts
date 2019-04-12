import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';

jest.mock('./post.repository');

describe('PostsService', () => {
  const postRepositoryMock = new PostRepository();
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: postRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get post by id', async () => {
    const postId = 1000;
    await service.findOneById(postId);

    expect(postRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(postRepositoryMock.findOne).toHaveBeenCalledWith({ id: postId });
  });

  it('should get posts', async () => {
    await service.getPosts();

    expect(postRepositoryMock.find).toHaveBeenCalledTimes(1);
  });
});
