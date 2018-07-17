import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import isEqual from 'lodash-es/isEqual';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { BusLine } from '../model';
import { BusLinesState, BusLinesStore } from './bus-lines.store';

@Injectable()
export class BusLinesQuery extends QueryEntity<BusLinesState, BusLine> {
  favorites$ = this.selectAll().pipe(map(lines => lines.filter(l => l.isFavorite)), distinctUntilChanged(isEqual));

  /**
   *
   */
  constructor(protected store: BusLinesStore) {
    super(store);
  }
}
