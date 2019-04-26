import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { GqlError } from '../utils/gql.error';

jest.mock('./user.repository');

describe('UserService', () => {
  const userRepositoryMock = new UserRepository();
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get user by id', async () => {
    const userId = 1000;
    await service.findOneById(userId);

    expect(userRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ id: userId });
  });

  it('should get user by email', async () => {
    const email = 'user@email.com';
    await service.findOneByEmail(email);

    expect(userRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ email });
  });

  it('should throw error if user exists', async () => {
    userRepositoryMock.findOne = jest.fn((x: any) => x);
    const userData = {
      email: 'user email',
      password: 'user password',
      name: 'User name',
    };

    await expect(service.addUser(userData)).rejects.toThrow();
  });

  it('should create user', async () => {
    const userData = {
      email: 'user email',
      password: 'user password',
      name: 'User name',
    };
    await service.addUser(userData);

    expect(userRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.findOne).toHaveBeenCalledWith({
      where: { email: userData.email },
    });
    expect(userRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.save).toHaveBeenCalledWith(userData);
  });

  it('should throw error if user not exists', async () => {
    userRepositoryMock.findOne = jest.fn((x: any) => undefined);
    const userId = 100;
    const userData = {
      email: 'user email',
      name: 'User name',
    };

    await expect(service.patchUser(userData, userId)).rejects.toThrow();
  });

  it('should patch user', async () => {
    userRepositoryMock.findOne = jest.fn((_: any) => ({} as any));
    const userId = 100;
    const newUserData = {
      email: 'user email new',
      name: 'User name new',
    };
    await service.patchUser(newUserData, userId);

    expect(userRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.findOne).toHaveBeenCalledWith({
      id: userId,
    });
    expect(userRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.save).toHaveBeenCalledWith(newUserData);
  });
});
