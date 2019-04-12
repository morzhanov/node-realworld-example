import { UserResolver } from './users.resolver';
import { UserRepository } from './user.repository';
import { UsersService } from './users.service';

jest.mock('./users.service');
jest.mock('./user.repository');

describe('UsersService', () => {
  const userServiceMock = new UsersService(new UserRepository());
  let resolver: UserResolver;

  beforeEach(async () => {
    resolver = new UserResolver(userServiceMock);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should get user by id', async () => {
    const userId = 1000;
    await resolver.getUser(userId);

    expect(userServiceMock.findOneById).toHaveBeenCalledTimes(1);
    expect(userServiceMock.findOneById).toHaveBeenCalledWith(userId);
  });

  it('should create user', async () => {
    const userData = {
      email: 'user email',
      name: 'User name',
    };
    await resolver.createUser(userData);

    expect(userServiceMock.addUser).toHaveBeenCalledTimes(1);
    expect(userServiceMock.addUser).toHaveBeenCalledWith(userData);
  });

  it('should edit user', async () => {
    const newUserData = {
      id: 1000,
      email: 'user email new',
      name: 'User name new',
    };
    await resolver.patchUser(newUserData);

    expect(userServiceMock.patchUser).toHaveBeenCalledTimes(1);
    expect(userServiceMock.patchUser).toHaveBeenCalledWith(newUserData);
  });
});
