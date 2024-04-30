// Uncomment these imports to begin using these cool features!

import { inject } from "@loopback/core";
import { FavoriteService, QueryPageResponse, Tmdb, TmdbProvider } from "../services";
import { get, getModelSchemaRef, param, post, requestBody } from "@loopback/rest";
import { Movie } from "../models";


export class MovieController {
  constructor(
    @inject('services.Tmdb')
    protected tmdb: Tmdb,
    @inject('services.FavoriteService')
    protected favoriteService: FavoriteService
  ) {}

  @get('/popular-movie/list', {
    responses: {
      '200': {
        description: 'List of Popular movies',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Movie)
          }
        }

      }
    }
  })
  async getPopular() {
    const tmdbMoviePopular: QueryPageResponse = await this.tmdb.getPopular()
    
    const resp = tmdbMoviePopular.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        poster_path: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        release_date: movie.release_date,
        popularity: movie.popularity,
        overview: movie.overview
      }
    })
    return resp
  }

  @get('/movie/search', {
    responses: {
      '200': {
        description: 'List of Popular movies',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Movie)
          }
        }

      }
    }
  })
  async searchMovie(@param.query.string('keyword') keyword: string) {
    const tmdbMoviePopular: QueryPageResponse = await this.tmdb.searchMovie(keyword)
    
    const resp = tmdbMoviePopular.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        poster_path: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        release_date: movie.release_date,
        popularity: movie.popularity,
        overview: movie.overview
      }
    })
    return resp
  }

  @get('/movie/{id}', {
    responses: {
      '200': {
        description: 'Movie by id',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Movie)
          }
        }
      }
    }
  })
  async getMovieById(@param.path.number('id') id: number){
    const tmdbMovie = await this.tmdb.getMovieById(id)
    return {
      ...tmdbMovie,
      poster_path: `https://image.tmdb.org/t/p/original/${tmdbMovie.poster_path}`
    }
  }

  @post('/movie/add-favorite', {
    responses: {
      '201': {
        description: 'Add movie to favorite',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {type: 'string'}
              }
            }
          }
        }
      }
    }
  })
  async addFavorite(@requestBody() body: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    popularity: number;
    overview: string;
  }) {
    await this.favoriteService.addFavorite(body)
    return {message: 'Success'}
  }

  @get('/favorite-movie/list', {
    responses: {
      '200': {
        description: 'List of Favorite movies',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Movie)
          }
        }

      }
    }
  })
  async getFavorite() {
    return this.favoriteService.getFavorites()
  }

  @post('/movie/remove-favorite', {
    responses: {
      '201': {
        description: 'Remove movie from favorite',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {type: 'string'}
              }
            }
          }
        }
      }
    }
  })
  async removeFavorite(@requestBody() body: {id: number}) {
    await this.favoriteService.removeFavorite(body.id)
    return {message: 'Success'}
  }
}
