import { SelecaoStore, State } from './selecao.store';
import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Concurso } from '../model';

@Injectable()
export class SelecaoQuery extends QueryEntity<State, Concurso> {
  constructor(protected store: SelecaoStore) {
    super(store);
  }
}
