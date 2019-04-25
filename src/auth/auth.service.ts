import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt-nodejs';

import { UsersService } from '../users/users.service';
import { GqlError } from '../utils/gql.error';
import { User } from '../users/user.entity';

export interface JwtPayload {
  id: number;
}

export interface GoogleProfile {
  name: string;
  email: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegistrationData extends LoginData {
  name: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(inputData: RegistrationData): Promise<User> {
    const hashedPwd = await this.cryptPassword(inputData.password);
    return this.usersService.addUser({
      ...inputData,
      password: hashedPwd,
    });
  }

  async signIn({ email, password }: LoginData): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new GqlError({ error: 'User not found', field: 'email' });
    }

    if (!(await this.comparePassword(password, user.password))) {
      throw new GqlError({
        errors: [
          { error: 'Not valid credentials', field: 'email' },
          { error: 'Not valid credentials', field: 'password' },
        ],
      });
    }

    return user;
  }

  async createToken(user: User): Promise<string> {
    return this.jwtService.sign({ id: user.id });
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return this.usersService.findOneById(payload.id);
  }

  async authGoogleUser(profile: GoogleProfile): Promise<User> {
    const user = await this.usersService.findOneByEmail(profile.email);

    if (user) {
      return user;
    }

    const password = await this.cryptPassword('default');
    return this.usersService.addUser({
      password,
      ...profile,
    });
  }

  async cryptPassword(password): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          reject(err);
        }
        bcrypt.hash(password, salt, null, (e, hash) => {
          if (e) {
            reject(e);
          }
          resolve(hash);
        });
      });
    });
  }

  async comparePassword(plainPass, hashword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainPass, hashword, (err, isPasswordMatch) => {
        if (err) {
          reject(err);
        }
        resolve(isPasswordMatch);
      });
    });
  }
}
