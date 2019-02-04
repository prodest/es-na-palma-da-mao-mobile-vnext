import { Concurso } from '../model';
import { EntityState, EntityStore } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface State extends EntityState<Concurso> {}

@Injectable()
export class SelecaoStore extends EntityStore<State, Concurso> {
  constructor() {
    super();
  }
}
