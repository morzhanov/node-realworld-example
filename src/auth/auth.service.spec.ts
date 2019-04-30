import { Test, TestingModule } from '@nestjs/testing';
import * as crypto from 'crypto';
import { AuthService, JwtPayload } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../users/user.repository';

jest.mock('../users/user.repository');
jest.mock('../users/users.service');
jest.mock('@nestjs/jwt');

describe('AuthService', () => {
  const userRepositoryMock = new UserRepository();
  const usersServiceMock = new UsersService(userRepositoryMock);
  const jwtServiceMock = new JwtService({});
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'UsersService',
          useValue: usersServiceMock,
        },
        {
          provide: 'JwtService',
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should signup user', async () => {
    const data = { email: 'email', password: 'password', name: 'name' };
    service.cryptPassword = jest.fn();
    await service.signUp(data);

    expect(service.cryptPassword).toHaveBeenCalledTimes(1);
    expect(service.cryptPassword).toHaveBeenCalledWith(data.password);
    expect(usersServiceMock.addUser).toHaveBeenCalledTimes(1);
  });

  it('should throw error if user not exists', async () => {
    usersServiceMock.findOneByEmail = jest.fn((x: any) => undefined);
    const data = {
      email: 'user email',
      password: 'user password',
    };

    await expect(service.signIn(data)).rejects.toThrow();
  });

  it('should throw error if password not valid', async () => {
    usersServiceMock.findOneByEmail = jest.fn((x: any) => x);
    service.comparePassword = jest.fn((_: any, __: any) =>
      Promise.resolve(false),
    );
    const data = {
      email: 'user email',
      password: 'user password',
    };

    await expect(service.signIn(data)).rejects.toThrow();
  });

  it('should signin user', async () => {
    const data = { email: 'email', password: 'password' };
    usersServiceMock.findOneByEmail = jest.fn((x: any) => data as any);
    service.comparePassword = jest.fn((_: any, __: any) =>
      Promise.resolve(true),
    );
    const res = await service.signIn(data);

    expect(service.comparePassword).toHaveBeenCalledTimes(1);
    expect(service.comparePassword).toHaveBeenCalledWith(
      data.password,
      data.password,
    );
    expect(res).toEqual(data);
  });

  it('should create token', async () => {
    const data: any = { id: 100 };
    await service.createToken(data);

    expect(jwtServiceMock.sign).toHaveBeenCalledTimes(1);
    expect(jwtServiceMock.sign).toHaveBeenCalledWith(data);
  });

  it('should validate user', async () => {
    const payload: JwtPayload = { id: 100 };
    const expectedData: any = { data: 'data' };
    usersServiceMock.findOneById = jest.fn((_: number) => expectedData);

    const res = await service.validateUser(payload);

    expect(usersServiceMock.findOneById).toHaveBeenCalledTimes(1);
    expect(usersServiceMock.findOneById).toHaveBeenCalledWith(payload.id);
    expect(res).toBe(expectedData);
  });

  it('should signup with google', async () => {
    const profile = { name: 'name', email: 'email' };
    const expectedUser: any = { data: 'data' };
    usersServiceMock.findOneByEmail = jest.fn((_: string) => expectedUser);

    const res = await service.authGoogleUser(profile);

    expect(usersServiceMock.findOneByEmail).toHaveBeenCalledTimes(1);
    expect(usersServiceMock.findOneByEmail).toHaveBeenCalledWith(profile.email);
    expect(res).toBe(expectedUser);
  });

  it('should signin with google', async () => {
    const profile = { name: 'name', email: 'email' };
    const hash = crypto.createHmac('sha512', 'salt');
    const password = 'default';
    hash.update(password);
    const passwordHash: any = hash.digest('hex');
    const expectedUser: any = { data: 'data', password: passwordHash };

    usersServiceMock.findOneByEmail = jest.fn((_: string) => undefined);
    service.cryptPassword = jest.fn((_: string) => passwordHash);
    usersServiceMock.addUser = jest.fn((_: any) => expectedUser);

    const res = await service.authGoogleUser(profile);

    expect(usersServiceMock.findOneByEmail).toHaveBeenCalledTimes(1);
    expect(usersServiceMock.findOneByEmail).toHaveBeenCalledWith(profile.email);
    expect(service.cryptPassword).toHaveBeenCalledTimes(1);
    expect(service.cryptPassword).toHaveBeenCalledWith(password);
    expect(res).toBe(expectedUser);
  });

  it('should crypt password', async () => {
    const password = 'default';

    const res = await service.cryptPassword(password);

    expect(typeof res).toBe('string');
    expect(res.length).toBeGreaterThan(5);
  });

  it('should return false if password not valid', async () => {
    const password = 'default';
    const notValidPassword = 'not-valid';
    const cryptedPassword = await service.cryptPassword(password);

    const res = await service.comparePassword(
      notValidPassword,
      cryptedPassword,
    );

    expect(res).toBeFalsy();
  });

  it('should return true if password valid', async () => {
    const password = 'default';
    const validPassword = 'default';
    const cryptedPassword = await service.cryptPassword(password);

    const res = await service.comparePassword(validPassword, cryptedPassword);

    expect(res).toBeTruthy();
  });
});
