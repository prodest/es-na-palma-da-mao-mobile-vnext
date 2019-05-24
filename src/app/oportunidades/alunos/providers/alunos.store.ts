import { Concurso } from '../model';
import { EntityState, EntityStore, StoreConfig, getInitialActiveState } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface AlunosState extends EntityState<Concurso> {}
const initialState: AlunosState = { ...getInitialActiveState() };
@StoreConfig({ name: 'alunos' })
@Injectable()
export class AlunosStore extends EntityStore<AlunosState, Concurso> {
  constructor() {
    super(initialState);
  }
}
