import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

import { ConfigService } from '../config/config.service';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile', 'email'],
      accessType: 'offline',
    });
  }

  async validate(_: any, __: string, ___: string, profile: any) {
    const data = { email: profile.emails[0].value, name: profile.displayName };
    return this.authService.authGoogleUser(data);
  }
}
