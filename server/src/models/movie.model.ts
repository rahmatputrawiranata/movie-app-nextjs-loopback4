import {Entity, Model, model, property} from '@loopback/repository';

@model()
export class Movie extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'string'
  })
  title: string;

  @property({
    image: 'string'
  })
  poster_path: string;

  @property({
    type: 'string'
  })
  release_date: string;

  @property({
    type: 'number'
  })

  popularity: number;

  @property({
    type: 'string'
  })

  overview: string;

  constructor(data?: Partial<Movie>) {
    super(data);
  }
}

export interface MovieRelations {
  // describe navigational properties here
}

export type MovietWithRelations = Movie & MovieRelations;
