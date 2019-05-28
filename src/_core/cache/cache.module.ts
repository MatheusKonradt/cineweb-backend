import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { RedisModule } from '../redis/redis.module';
import { ConfigModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [RedisModule, ConfigModule, LoggerModule],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
