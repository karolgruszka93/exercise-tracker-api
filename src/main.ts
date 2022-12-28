import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';

const httpsOptions = {
  key: fs.readFileSync(__dirname + '/secrets/localhost-key.pem'),
  cert: fs.readFileSync(__dirname + '/secrets/localhost.pem'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
