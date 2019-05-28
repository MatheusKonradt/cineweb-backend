import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerInterceptor } from './logger.interceptor';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    ConfigModule,
  ],
  providers: [
    LoggerInterceptor,
    LoggerService,
  ],
  exports: [
    LoggerInterceptor,
    LoggerService,
  ],
})
export class LoggerModule {}
