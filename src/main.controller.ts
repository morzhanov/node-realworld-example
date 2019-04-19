import { Controller, Get, Res, Req, Next } from '@nestjs/common';
import { join } from 'path';
import { Request, Response } from 'express';

@Controller('*')
export class MainController {
  @Get('/')
  static(@Req() req: Request, @Res() res: Response, @Next() next) {
    if (req.url === '/graphql' || req.url.indexOf('/api') >= 0) {
      return next();
    }
    res.sendFile(join(__dirname, 'public/index.html'));
  }
}
