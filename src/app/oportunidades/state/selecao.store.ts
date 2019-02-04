import { Concurso } from '../model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface State extends EntityState<Concurso> {}

@StoreConfig({ name: 'concurso' })
@Injectable()
export class SelecaoStore extends EntityStore<State, Concurso> {
  constructor() {
    super();
  }
}
