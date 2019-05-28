import {winstonClient} from './libs/winston-client';
import { Injectable, Optional, Type } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export class LoggerService implements LoggerService {
  private readonly metadata: any;

  constructor(
    private readonly config: ConfigService,
  ) {
    this.metadata = {
      env: process.env.NODE_ENV,
      service: this.config.get('app.name'),
    };
  }

  error(message: any, context: any): any {
    winstonClient.error({
      message,
      context: context.constructor.name,
      ...this.metadata,
    });
  }

  log(message: any, context: any): any {
    winstonClient.info({
      message,
      context: context.constructor.name,
      ...this.metadata,
    });
  }

  warn(message: any, context: any): any {
    winstonClient.warn({
      message,
      context: context.constructor.name,
      ...this.metadata,
    });
  }
}
