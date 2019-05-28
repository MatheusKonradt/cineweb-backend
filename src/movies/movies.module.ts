import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { CoreModule } from '../_core/core.module';
import { TmdbModule } from '../tmdb/tmdb.module';
import { MovieParserService } from './services/movie-parser.service';
import { ConfigurationModule } from '../configuration/configuration.module';

@Module({
  imports: [CoreModule, TmdbModule, ConfigurationModule],
  controllers: [MoviesController],
  providers: [MoviesService, MovieParserService],
  exports: [MoviesService],
})
export class MoviesModule {}
