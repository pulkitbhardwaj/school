import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT;
  const host = process.env.HOST;
  const logger = new Logger('Server');

  const app = await NestFactory.create(AppModule);

  await app.listen(port, host, () => {
    logger.debug(`Server listening at http://${host}:${port}`);
  });
}

bootstrap();
