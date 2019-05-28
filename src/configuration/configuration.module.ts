import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { CoreModule } from '../_core/core.module';
import { TmdbModule } from '../tmdb/tmdb.module';

@Module({
  imports: [
    CoreModule,
    TmdbModule,
  ],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
