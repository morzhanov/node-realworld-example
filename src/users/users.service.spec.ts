import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

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

  it('should create user', async () => {
    const userData = {
      email: 'user email',
      name: 'User name',
    };
    await service.addUser(userData);

    expect(userRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.create).toHaveBeenCalledWith(userData);
  });

  it('should edit user', async () => {
    const newUserData = {
      id: 1000,
      email: 'user email new',
      name: 'User name new',
    };
    await service.patchUser(newUserData);

    expect(userRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(userRepositoryMock.update).toHaveBeenCalledWith(
      { id: newUserData.id },
      newUserData,
    );
  });
});
