import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CLIENT } from '../redis/common/constants';
import { Redis } from 'ioredis';
import { AxiosInstance } from 'axios';
import { LoggerService } from '../logger/logger.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class CacheService {
  private readonly prefix: string;

  constructor(
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
    private readonly logger: LoggerService,
    private readonly config: ConfigService,
  ) {
    this.prefix = this.config.get('cache.prefix');
  }

  async fetch<T = any>(axios: AxiosInstance, url: string, expiration: number = 60): Promise<T> {
    const key = `${this.prefix}:${url}`;
    const serialized = await this.redis.get(key);
    if (serialized) {
      try {
        return JSON.parse(serialized);
      } catch (e) {
        this.logger.error(e, this);
        await this.redis.del(key);
      }
    }
    const { data } = await axios.get(url);
    await this.redis.set(key, JSON.stringify(data));
    await this.redis.expire(key, expiration);
    return data;
  }
}
