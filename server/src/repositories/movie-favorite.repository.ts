import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {LocalDataSource} from '../datasources';
import {Movie, MovietWithRelations} from '../models';

export class MovieFavoriteRepository extends DefaultCrudRepository<
  Movie,
  typeof Movie.prototype.id,
  MovietWithRelations
> {
  constructor(
    @inject('datasources.local') dataSource: LocalDataSource,
  ) {
    super(Movie, dataSource);
  }
}
