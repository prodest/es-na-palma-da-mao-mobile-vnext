import { SelecaoStore, ConcursoState } from './selecao.store';
import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Concurso } from '../model';

@Injectable()
export class SelecaoQuery extends QueryEntity<ConcursoState, Concurso> {
  /**
   *
   *
   */
  constructor(protected store: SelecaoStore) {
    super(store);
  }
}
