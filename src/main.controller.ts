import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'path';

@Controller('*')
export class MainController {
  @Get('/')
  static(@Res() res) {
    res.sendFile(join(__dirname, 'public/index.html'));
  }
}
