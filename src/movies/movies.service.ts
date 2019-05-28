import { Inject, Injectable } from '@nestjs/common';
import { TMDB_CLIENT } from '../tmdb/common/constants';
import { AxiosInstance } from 'axios';
import { CacheService } from '../_core/cache/cache.service';
import { QueryDto } from './dto/query.dto';
import * as QS from 'querystring';
import * as _ from 'lodash';
import { MovieListInterface } from './interfaces/movie-list.interface';
import { MovieParserService } from './services/movie-parser.service';
import { MovieDetailsInterface } from './interfaces/movie-details.interface';
import { SearchQueryDto } from './dto/search-query.dto';

@Injectable()
export class MoviesService {
  constructor(
    @Inject(TMDB_CLIENT) private readonly tmdb: AxiosInstance,
    private readonly cache: CacheService,
    private readonly movieParser: MovieParserService,
  ) { }

  async listUpcomingMovies(query: QueryDto): Promise<MovieListInterface[]> {
    const qs = QS.stringify(query);
    const data = await this.cache.fetch(this.tmdb, `/movie/upcoming?${qs}`, 300);
    return await this.movieParser.parseList(data.results);
  }

  async getMovieDetails(id: string): Promise<MovieDetailsInterface> {
    const data = await this.cache.fetch(this.tmdb, `/movie/${id}`, 300);
    const parsed = await this.movieParser.parseDetails(data);
    parsed.video = await this.getMovieVideo(id);
    return parsed;
  }

  async getMovieVideo(id: string): Promise<string|null> {
    const data = await this.cache.fetch(this.tmdb, `/movie/${id}/videos`, 300);
    const teaser = _.find(data.results, { site: 'YouTube', type: 'Teaser' });
    const trailer = _.find(data.results, { site: 'YouTube', type: 'Trailer' });
    const video = trailer || teaser;
    if (!video) {
      return null;
    }
    return `https://www.youtube.com/embed/${video.key}`;
  }

  async searchMovies(query: SearchQueryDto): Promise<MovieListInterface[]> {
    const qs = QS.stringify(query);
    const data = await this.cache.fetch(this.tmdb, `/search/movie?${qs}`, 300);
    return await this.movieParser.parseList(data.results);
  }
}
