import { AlunosStore, AlunosState } from './alunos.store';
import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Concurso } from '../model';

@Injectable()
export class AlunosQuery extends QueryEntity<AlunosState, Concurso> {
  /**
   *
   *
   */
  constructor(protected store: AlunosStore) {
    super(store);
  }
}
