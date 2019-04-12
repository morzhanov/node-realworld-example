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

  it('should get posts by author id', async () => {
    const authorId = 1000;
    await service.getPostsByAuthor(authorId);

    expect(postRepositoryMock.find).toHaveBeenCalledTimes(1);
    expect(postRepositoryMock.find).toHaveBeenLastCalledWith({
      where: { author: authorId },
    });
  });

  it('should create post', async () => {
    const postData = {
      title: 'Post title',
      content: 'Post content',
      authorId: 1000,
      imageUrl: 'image url',
    };
    await service.addPost(postData);

    expect(postRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(postRepositoryMock.create).toHaveBeenCalledWith(postData);
  });

  it('should edit post', async () => {
    const newPostData = {
      id: 1000,
      title: 'Post title new',
      content: 'Post content new',
      imageUrl: 'image url new',
    };
    await service.patchPost(newPostData);

    expect(postRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(postRepositoryMock.update).toHaveBeenCalledWith(
      { id: newPostData.id },
      newPostData,
    );
  });

  it('should delete post', async () => {
    const postId = 1000;
    await service.deletePost(postId);

    expect(postRepositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(postRepositoryMock.delete).toHaveBeenCalledWith({ id: postId });
  });
});
