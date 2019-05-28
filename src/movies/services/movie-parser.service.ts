import { Injectable } from '@nestjs/common';
import { RawMovieListInterface } from '../interfaces/raw-movie-list.interface';
import { MovieListInterface } from '../interfaces/movie-list.interface';
import { ConfigurationService } from '../../configuration/configuration.service';
import * as moment from 'moment';
import { MovieDetailsInterface } from '../interfaces/movie-details.interface';
import { RawMovieDetailsInterface } from '../interfaces/raw-movie-details.interface';

function join(...paths: string[]) {
  return paths.join('');
}

@Injectable()
export class MovieParserService {
  constructor(
    private readonly configurationService: ConfigurationService,
  ) {}

  async parseList(rawMoviesList: RawMovieListInterface[]): Promise<MovieListInterface[]> {
    const configuration = await this.configurationService.getAPIConfiguration();
    return rawMoviesList.map(raw => {
      const release = new Date(raw.release_date);
      const movie: MovieListInterface = {
        id: raw.id,
        title: raw.title,
        rating: raw.vote_average,
        votes: raw.vote_count,
        release: moment(release).format('MMM Do YYYY'),
        poster: raw.poster_path ? join(configuration.images.secure_base_url, 'w185', raw.poster_path) : null,
        backdrop: raw.backdrop_path ? join(configuration.images.secure_base_url, 'w1280', raw.backdrop_path) : null,
      };
      return movie;
    });
  }

  async parseDetails(rawMovieDetail: RawMovieDetailsInterface): Promise<MovieDetailsInterface> {
    const configuration = await this.configurationService.getAPIConfiguration();
    const release = new Date(rawMovieDetail.release_date);
    const movie: MovieDetailsInterface = {
      id: rawMovieDetail.id,
      title: rawMovieDetail.title,
      rating: rawMovieDetail.vote_average,
      votes: rawMovieDetail.vote_count,
      release: moment(release).format('MMM Do YYYY'),
      poster: rawMovieDetail.poster_path ? join(configuration.images.secure_base_url, 'w500', rawMovieDetail.poster_path) : null,
      backdrop: rawMovieDetail.backdrop_path ? join(configuration.images.secure_base_url, 'w1280', rawMovieDetail.backdrop_path) : null,
      genres: rawMovieDetail.genres,
      overview: rawMovieDetail.overview,
    };
    return movie;
  }
}
