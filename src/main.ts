import { EnvNameEnum } from './_core/common/env-name.enum';

process.env.NODE_ENV = process.env.NODE_ENV || EnvNameEnum.DEVELOPMENT;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { boot } from './_core/boot';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { LoggerService } from './_core/logger/logger.service';
import { INestApplication } from '@nestjs/common';

(async () => {
  let app: INestApplication;
  try {
    app = await NestFactory.create(AppModule, new FastifyAdapter());
    await boot(app);
  } catch (err) {
    // tslint:disable-next-line:no-console
    const logger = (app && app.get(LoggerService)) || console;
    logger.error(err, __filename);
    process.exit(-1);
  }
})();
