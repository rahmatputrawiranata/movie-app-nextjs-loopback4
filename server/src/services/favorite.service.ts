import {injectable, /* inject, */ BindingScope, inject} from '@loopback/core';
import { MovieFavoriteRepository } from '../repositories';
import { repository } from '@loopback/repository';

@injectable({scope: BindingScope.TRANSIENT})
export class FavoriteService {
  constructor(
    @repository(MovieFavoriteRepository)
    public movieFavoriteRepository: MovieFavoriteRepository
  ) {}

  async addFavorite(data: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    popularity: number;
    overview: string;
  
  }) {
    return this.movieFavoriteRepository.create(data)
  }

  async getFavorites() {
    return this.movieFavoriteRepository.find()
  }

  async removeFavorite(id: number) {
    return this.movieFavoriteRepository.deleteById(id)
  }
}
