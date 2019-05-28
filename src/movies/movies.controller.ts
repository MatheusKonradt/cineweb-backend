import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { QueryDto } from './dto/query.dto';
import { SearchQueryDto } from './dto/search-query.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @Get('upcoming')
  async listUpcomingMovies(@Query() query: QueryDto): Promise<any> {
    const results = await this.moviesService.listUpcomingMovies(query);
    return {results};
  }

  @Get('search')
  async searchMovies(@Query() query: SearchQueryDto): Promise<any> {
    const results = await this.moviesService.searchMovies(query);
    return {results};
  }

  @Get(':id')
  async getMovieDetails(@Param('id') id: string): Promise<any> {
    const movie = await this.moviesService.getMovieDetails(id);
    return {movie};
  }
}
