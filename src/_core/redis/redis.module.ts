import { Module } from '@nestjs/common';
import { REDIS_CLIENT } from './common/constants';
import { ConfigService } from '../config/config.service';
import * as Redis from 'ioredis';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [{
    provide: REDIS_CLIENT,
    useFactory: (config: ConfigService) => new Redis(config.get('redis')),
    inject: [ConfigService],
  }],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}
