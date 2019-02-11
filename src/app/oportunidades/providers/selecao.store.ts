import { Concurso } from '../model';
import { EntityState, EntityStore, StoreConfig, getInitialActiveState } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface ConcursoState extends EntityState<Concurso> {}
const initialState: ConcursoState = { ...getInitialActiveState() };
@StoreConfig({ name: 'concurso' })
@Injectable()
export class SelecaoStore extends EntityStore<ConcursoState, Concurso> {
  constructor() {
    super(initialState);
  }
}
