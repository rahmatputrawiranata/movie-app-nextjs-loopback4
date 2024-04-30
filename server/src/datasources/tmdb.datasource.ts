import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import { operation } from '@loopback/rest';

const config = {
  name: 'tmdb',
  connector: 'rest',
  baseURL: 'https://api.themoviedb.org/3/account/null',
  crud: true,
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjA5OWIwMGM3ZGZiOTE1Mzk1MTEzMWFjYWI4ZWRkOSIsInN1YiI6IjY2MmYwOTQ5NTExZDA5MDEyN2M1NjQzMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NOUU1oDE8mv9M3x-rZwJjAw5dsbhN8s2FSQ_WoX9s8Y',

    }
  },
  operations: [
    {
      template: {
        method: 'GET',
        fullResponse: false,
        url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
      },
      functions: {
        getPopular: []
      }
    },
    {
      template: {
        method: 'GET',
        fullResponse: false,
        url: 'https://api.themoviedb.org/3/movie/{id}?language=en-US'
      },
      functions: {
        getMovieById: ['id']
      }
    },
    {
      template: {
        method: 'GET',
        fullResponse: false,
        url: 'https://api.themoviedb.org/3/search/movie?query={query}&page=1'
      },
      functions: {
        searchMovie: ['query']
      }
    }
  ]

};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class TmdbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'tmdb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.tmdb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
