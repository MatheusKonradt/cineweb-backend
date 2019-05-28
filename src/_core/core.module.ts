import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from './config/config.module';
import { GlobalFilter } from './common/global.filter';
import { RedisModule } from './redis/redis.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    RedisModule,
    CacheModule,
  ],
  providers: [GlobalFilter],
  exports: [GlobalFilter],
})
export class CoreModule {}
