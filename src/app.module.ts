import { Module} from '@nestjs/common';
import { CoreModule } from './_core/core.module';
import { TmdbModule } from './tmdb/tmdb.module';
import { MoviesModule } from './movies/movies.module';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [
    CoreModule,
    TmdbModule,
    MoviesModule,
    ConfigurationModule,
  ],
})
export class AppModule {}
