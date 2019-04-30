import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join, resolve } from 'path';
import * as fs from 'fs';

import { AppModule } from './app.module';

async function bootstrap() {
  const keyFile = fs.readFileSync(resolve(__dirname, '../ssl/key.pem'));
  const certFile = fs.readFileSync(resolve(__dirname, '../ssl/cert.pem'));

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    httpsOptions: {
      key: keyFile,
      cert: certFile,
    },
  });
  app.useStaticAssets(join(__dirname, 'public'));
  app.enableCors();
  await app.listen(process.env.PORT);
}
bootstrap();
