import { TestingModule, Test } from '@nestjs/testing';

import { UserResolver } from './users.resolver';
import { UserRepository } from './user.repository';
import { UsersService } from './users.service';

jest.mock('./users.service');
jest.mock('./user.repository');

describe('UsersService', () => {
  const userServiceMock = new UsersService(new UserRepository());
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: 'UsersService',
          useValue: userServiceMock,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should get current user', async () => {
    const ctx = { user: { id: 1000 } };
    const expectedValue = { data: 'data' };
    userServiceMock.findOneById = jest.fn().mockReturnValue(expectedValue);
    const res = await resolver.me(ctx);

    expect(userServiceMock.findOneById).toHaveBeenCalledTimes(1);
    expect(userServiceMock.findOneById).toHaveBeenCalledWith(ctx.user.id);
    expect(res).toEqual(expectedValue);
  });

  it('should get user by id', async () => {
    const userId = 1000;
    const expectedValue = { data: 'data' };
    userServiceMock.findOneById = jest.fn().mockReturnValue(expectedValue);
    const res = await resolver.getUser(userId);

    expect(userServiceMock.findOneById).toHaveBeenCalledTimes(1);
    expect(userServiceMock.findOneById).toHaveBeenCalledWith(userId);
    expect(res).toEqual(expectedValue);
  });

  it('should patch user', async () => {
    const newUserData = {
      id: 1000,
      email: 'user email new',
      name: 'User name new',
    };
    const ctx = { user: { id: 1000 } };
    const expectedValue = { data: 'data' };
    userServiceMock.patchUser = jest.fn().mockReturnValue(expectedValue);
    const res = await resolver.patchUser(newUserData, ctx);

    expect(userServiceMock.patchUser).toHaveBeenCalledTimes(1);
    expect(userServiceMock.patchUser).toHaveBeenCalledWith(
      newUserData,
      ctx.user.id,
    );
    expect(res).toEqual(expectedValue);
  });
});
