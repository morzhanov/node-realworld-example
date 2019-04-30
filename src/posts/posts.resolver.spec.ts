import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { PostResolver } from './posts.resolver';
import { PostRepository } from './post.repository';
import { PostsService } from './posts.service';
import { CacheService } from '../cache/cache.service';
import { Post } from './post.entity';
import { PubSubService } from '../pubsub/pubsub.service';

jest.mock('./posts.service');
jest.mock('../cache/cache.service');
jest.mock('./post.repository');

describe('PostsService', () => {
  const posteRositoryMock = new PostRepository();
  const cacheServiceMock = new CacheService();
  const pubSubServiceMock = new PubSubService();
  const postServiceMock = new PostsService(posteRositoryMock, cacheServiceMock);
  let resolver: PostResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostResolver,
        {
          provide: getRepositoryToken(Post),
          useValue: postServiceMock,
        },
        {
          provide: 'PostsService',
          useValue: postServiceMock,
        },
        {
          provide: 'CacheService',
          useValue: cacheServiceMock,
        },
        {
          provide: 'PubSubService',
          useValue: pubSubServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<PostResolver>(PostResolver);
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should get post by id', async () => {
    const postId = 1000;
    const expectedValue = new Post();
    postServiceMock.findOneById = jest.fn().mockReturnValue(expectedValue);
    const res = await resolver.getPost(postId);

    expect(postServiceMock.findOneById).toHaveBeenCalledTimes(1);
    expect(postServiceMock.findOneById).toHaveBeenCalledWith(postId);
    expect(res).toEqual(expectedValue);
  });

  it('should get posts', async () => {
    const ctx = { user: { id: 1000 } };
    const expectedValue = [new Post()];
    postServiceMock.getPostsByAuthor = jest.fn().mockReturnValue(expectedValue);
    const res = await resolver.getPosts(ctx);

    expect(postServiceMock.getPostsByAuthor).toHaveBeenCalledTimes(1);
    expect(postServiceMock.getPostsByAuthor).toHaveBeenLastCalledWith(
      ctx.user.id,
    );
    expect(res).toEqual(expectedValue);
  });

  it('should create post', async () => {
    const postData = {
      title: 'Post title',
      content: 'Post content',
      authorId: 1000,
      imageUrl: 'image url',
    };
    const ctx = { user: { id: 1000 } };
    const expectedValue = [new Post()];
    const publishFnMock = jest.fn();
    postServiceMock.addPost = jest.fn().mockReturnValue(expectedValue);
    pubSubServiceMock.getPubSub = jest
      .fn()
      .mockReturnValue({ publish: publishFnMock });

    const res = await resolver.createPost(postData, ctx);

    expect(postServiceMock.addPost).toHaveBeenCalledTimes(1);
    expect(postServiceMock.addPost).toHaveBeenCalledWith(postData, ctx.user.id);
    expect(publishFnMock).toHaveBeenCalledTimes(1);
    expect(publishFnMock).toHaveBeenCalledWith('POST_ADDED', {
      postAdded: expectedValue,
    });
    expect(res).toEqual(expectedValue);
  });

  it('should patch post', async () => {
    const newPostData = {
      id: 1000,
      title: 'Post title new',
      content: 'Post content new',
      imageUrl: 'image url new',
    };
    const ctx = { user: { id: 1000 } };
    const expectedValue = [new Post()];
    postServiceMock.patchPost = jest.fn().mockReturnValue(expectedValue);

    const res = await resolver.patchPost(newPostData, ctx);

    expect(postServiceMock.patchPost).toHaveBeenCalledTimes(1);
    expect(postServiceMock.patchPost).toHaveBeenCalledWith(
      newPostData,
      ctx.user.id,
    );
    expect(res).toEqual(expectedValue);
  });

  it('should delete post', async () => {
    const postId = 100;
    const ctx = { user: { id: 1000 } };
    const expectedValue = `Post ${postId} deleted`;
    postServiceMock.deletePost = jest.fn();

    const res = await resolver.deletePost(postId, ctx);

    expect(postServiceMock.deletePost).toHaveBeenCalledTimes(1);
    expect(postServiceMock.deletePost).toHaveBeenCalledWith(
      postId,
      ctx.user.id,
    );
    expect(res).toEqual(expectedValue);
  });
});
