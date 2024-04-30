import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {TmdbDataSource} from '../datasources';

export interface Tmdb {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.

  getPopular(): Promise<QueryPageResponse>;
  getMovieById(id: number): Promise<Movie>;
  searchMovie(query: string): Promise<QueryPageResponse>;
}

export interface QueryPageResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface Movie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}


export class TmdbProvider implements Provider<Tmdb> {
  constructor(
    // tmdb must match the name property in the datasource json file
    @inject('datasources.tmdb')
    protected dataSource: TmdbDataSource = new TmdbDataSource(),
  ) {}

  value(): Promise<Tmdb> {
    return getService(this.dataSource);
  }
}

