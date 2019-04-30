import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as passport from 'passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../users/user.repository';
import { User } from '../users/user.entity';
import { HttpStatus } from '@nestjs/common';

jest.mock('../users/users.service');
jest.mock('../users/user.repository');
jest.mock('@nestjs/jwt');
jest.mock('./auth.service');
const userMock = new User();
jest.mock('passport', () => ({
  authenticate: jest.fn((_: string, fn: (__: Error, __user: User) => void) =>
    jest.fn(() => {
      if (typeof fn === 'function') {
        fn(null, userMock);
      }
    }),
  ),
}));

describe('Auth Controller', () => {
  let controller: AuthController;
  const userRepositoryMock = new UserRepository();
  const userServiceMock = new UsersService(userRepositoryMock);
  const jwtServiceMock = new JwtService({});
  const authServiceMock = new AuthService(userServiceMock, jwtServiceMock);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: 'AuthService', useValue: authServiceMock }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login user with passport', async () => {
    const jsonFn = jest.fn();
    const res: any = { status: jest.fn().mockReturnValue({ json: jsonFn }) };
    await controller.login(null, res, null);
    expect(passport.authenticate).toHaveBeenCalledTimes(1);
    expect(authServiceMock.createToken).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
    expect(jsonFn).toHaveBeenCalledTimes(1);
  });

  it('should sign up user', async () => {
    const mockUser = new User();
    const mockToken = 'token';
    const mockBody = { data: 'data' };
    authServiceMock.signUp = jest.fn().mockReturnValue(mockUser);
    authServiceMock.createToken = jest.fn().mockReturnValue(mockToken);

    const res = await controller.signup(mockBody);

    expect(authServiceMock.signUp).toHaveBeenCalledTimes(1);
    expect(authServiceMock.signUp).toHaveBeenCalledWith(mockBody);
    expect(authServiceMock.createToken).toHaveBeenCalledTimes(1);
    expect(authServiceMock.createToken).toHaveBeenCalledWith(mockUser);
    expect(res).toEqual({ token: mockToken });
  });

  it('should auth with google', async () => {
    await controller.google({} as any, {} as any, jest.fn());
    expect(passport.authenticate).toHaveBeenCalledTimes(1);
  });

  it('should call google callback', async () => {
    const res: any = { cookie: jest.fn(), redirect: jest.fn() };
    await controller.googleCallback(null, res, null);
    expect(passport.authenticate).toHaveBeenCalledTimes(1);
    expect(authServiceMock.createToken).toHaveBeenCalledTimes(1);
    expect(res.cookie).toHaveBeenCalledTimes(1);
    expect(res.redirect).toHaveBeenCalledTimes(1);
  });
});
