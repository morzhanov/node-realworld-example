import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email: string, password: string, done: Function) => {
        const res = await authService.signIn({ email, password });
        done(null, res);
      },
    );
  }
}
