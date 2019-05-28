import { MovieListInterface } from './movie-list.interface';

export interface MovieDetailsInterface extends MovieListInterface {
  genres: Array<{
    id: number;
    name: string;
  }>;
  overview: string;
  video?: string;
}
