import { Module } from '@nestjs/common';
import { CoreModule } from '../_core/core.module';
import { ConfigService } from '../_core/config/config.service';
import Axios from 'axios';
import { TMDB_CLIENT } from './common/constants';

@Module({
  imports: [CoreModule],
  providers: [{
    provide: TMDB_CLIENT,
    useFactory: (config: ConfigService) => Axios.create({
      ...config.get('tmdb'),
    }),
    inject: [ConfigService],
  }],
  exports: [TMDB_CLIENT],
})
export class TmdbModule {}
