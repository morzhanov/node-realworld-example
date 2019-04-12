import { PostResolver } from './posts.resolver';
import { PostRepository } from './post.repository';
import { PostsService } from './posts.service';

jest.mock('./posts.service');
jest.mock('./post.repository');

describe('PostsService', () => {
  const postServiceMock = new PostsService(new PostRepository());
  let resolver: PostResolver;

  beforeEach(async () => {
    resolver = new PostResolver(postServiceMock);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should get post by id', async () => {
    const postId = 1000;
    await resolver.getPost(postId);

    expect(postServiceMock.findOneById).toHaveBeenCalledTimes(1);
    expect(postServiceMock.findOneById).toHaveBeenCalledWith(postId);
  });

  it('should get posts by author id', async () => {
    const authorId = 1000;
    await resolver.getPostsByAuthor(authorId);

    expect(postServiceMock.getPostsByAuthor).toHaveBeenCalledTimes(1);
    expect(postServiceMock.getPostsByAuthor).toHaveBeenLastCalledWith(authorId);
  });

  it('should create post', async () => {
    const postData = {
      title: 'Post title',
      content: 'Post content',
      authorId: 1000,
      imageUrl: 'image url',
    };
    await resolver.createPost(postData);

    expect(postServiceMock.addPost).toHaveBeenCalledTimes(1);
    expect(postServiceMock.addPost).toHaveBeenCalledWith(postData);
  });

  it('should edit post', async () => {
    const newPostData = {
      id: 1000,
      title: 'Post title new',
      content: 'Post content new',
      imageUrl: 'image url new',
    };
    await resolver.patchPost(newPostData);

    expect(postServiceMock.patchPost).toHaveBeenCalledTimes(1);
    expect(postServiceMock.patchPost).toHaveBeenCalledWith(newPostData);
  });

  it('should delete post', async () => {
    const postId = 1000;
    await resolver.deletePost(postId);

    expect(postServiceMock.deletePost).toHaveBeenCalledTimes(1);
    expect(postServiceMock.deletePost).toHaveBeenCalledWith(postId);
  });
});
