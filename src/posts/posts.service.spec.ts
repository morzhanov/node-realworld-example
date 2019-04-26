import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { PostsService } from './posts.service';
import { Post } from './post.entity';
import { PostRepository } from './post.repository';
import { CacheService } from '../cache/cache.service';

jest.mock('./post.repository');
jest.mock('../cache/cache.service');

describe('PostsService', () => {
  const postRepositoryMock = new PostRepository();
  const cacheServiceMock = new CacheService();
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: postRepositoryMock,
        },
        CacheService,
        {
          provide: 'CacheService',
          useValue: cacheServiceMock,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    jest.resetAllMocks();
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
      where: { authorId },
    });
  });

  it('should create post', async () => {
    const authorId = 100;
    const postData = {
      title: 'Post title',
      content: 'Post content',
      imageUrl: 'image url',
    };
    const newPost = { ...postData, id: 1000 };
    postRepositoryMock.save = jest.fn((_: any) => newPost as any);

    await service.addPost(postData, authorId);

    expect(cacheServiceMock.clearCache).toHaveBeenCalledWith(authorId);
    expect(postRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(postRepositoryMock.save).toHaveBeenCalledWith({
      ...postData,
      authorId,
    });
    expect(postRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(postRepositoryMock.findOne).toHaveBeenCalledWith({ id: newPost.id });
  });

  it('should throw error if post not exists', async () => {
    postRepositoryMock.findOne = jest.fn((_: any) => undefined);
    const authorId = 100;
    const postData = {
      id: 100,
      title: 'Post title',
      content: 'Post content',
      imageUrl: 'image url',
    };

    await expect(service.patchPost(postData, authorId)).rejects.toThrow();
  });

  it('should edit post', async () => {
    postRepositoryMock.findOne = jest.fn((_: any) => ({} as any));
    const authorId = 100;
    const postData = {
      id: 100,
      title: 'Post title',
      content: 'Post content',
      imageUrl: 'image url',
    };
    await service.patchPost(postData, authorId);

    expect(cacheServiceMock.clearCache).toHaveBeenCalledWith(authorId);
    expect(postRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(postRepositoryMock.save).toHaveBeenCalledWith(postData);
    expect(postRepositoryMock.findOne).toHaveBeenCalledTimes(2);
    expect(postRepositoryMock.findOne).toHaveBeenCalledWith({
      id: postData.id,
    });
  });

  it('should throw error if post not exists (deleting)', async () => {
    postRepositoryMock.findOne = jest.fn((_: any) => undefined);
    const authorId = 100;
    const postId = 100;

    await expect(service.deletePost(postId, authorId)).rejects.toThrow();
  });

  it('should delete post', async () => {
    postRepositoryMock.findOne = jest.fn((_: any) => ({} as any));
    const authorId = 100;
    const postId = 1000;
    await service.deletePost(postId, authorId);

    expect(cacheServiceMock.clearCache).toHaveBeenCalledWith(authorId);
    expect(postRepositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(postRepositoryMock.delete).toHaveBeenCalledWith({ id: postId });
  });
});
