import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt-nodejs';

import { UsersService } from '../users/users.service';
import { LoginInput, RegistrationInput } from './auth.inputs';
import { LoginResponse, RegistrationResponse } from './auth.outputs';

export interface JwtPayload {
  id: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(inputData: RegistrationInput): Promise<RegistrationResponse> {
    const hashedPwd = await this.cryptPassword(inputData.password);
    const user = await this.usersService.addUser({
      ...inputData,
      password: hashedPwd,
    });

    return { token: await this.jwtService.sign({ id: user.id }), user };
  }

  async signIn({ email, password }: LoginInput): Promise<LoginResponse> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    if (!(await this.comparePassword(password, user.password))) {
      throw new Error('Not valid credentials');
    }

    return { token: await this.jwtService.sign({ id: user.id }) };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return this.usersService.findOneById(payload.id);
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
