import { Inject, Injectable } from '@nestjs/common';
import { TMDB_CLIENT } from '../tmdb/common/constants';
import { AxiosInstance } from 'axios';
import { CacheService } from '../_core/cache/cache.service';
import { RawAPIConfigurationInterface } from './interfaces/raw-api-configuration.interface';

@Injectable()
export class ConfigurationService {
  constructor(
    @Inject(TMDB_CLIENT) private readonly tmdb: AxiosInstance,
    private readonly cache: CacheService,
  ) { }

  async getAPIConfiguration(): Promise<RawAPIConfigurationInterface> {
    return await this.cache.fetch<RawAPIConfigurationInterface>(this.tmdb, '/configuration', 600);
  }
}
