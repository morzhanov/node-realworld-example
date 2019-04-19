import {
  Controller,
  Post,
  Req,
  Res,
  Next,
  Body,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { authenticate } from 'passport';

import { AuthService } from './auth.service';
import { Request, Response, NextFunction } from 'express';
import { User } from '../users/user.entity';
import { ConfigService } from '../config/config.service';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/login')
  login(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    authenticate('local', async (_: Error, user: User) => {
      const token = await this.authService.createToken(user);
      res.status(HttpStatus.OK).json({ token });
    })(req, res, next);
  }

  @Post('/signup')
  async signup(@Body() body: any) {
    const user = await this.authService.signUp(body);
    const token = await this.authService.createToken(user);
    return { token };
  }

  @Get('/google')
  google(@Req() req: Request, @Res() res: Response, @Next() next) {
    authenticate('google', { prompt: 'select_account' })(req, res, next);
  }

  @Get('/google/callback')
  googleCallback(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    authenticate('google', async (_: Error, user: User) => {
      const token = await this.authService.createToken(user);
      res.cookie('token', token);
      res.redirect(`/`);
    })(req, res, next);
  }
}
