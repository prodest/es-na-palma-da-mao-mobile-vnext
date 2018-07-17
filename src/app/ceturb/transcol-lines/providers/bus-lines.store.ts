import { Injectable } from '@angular/core';
import { EntityState, EntityStore, getInitialActiveState, StoreConfig } from '@datorama/akita';

import { BusLine } from '../model';

export interface BusLinesState extends EntityState<BusLine> {}

const initialState: BusLinesState = { ...getInitialActiveState() };

@Injectable()
@StoreConfig({ name: 'busLines', idKey: 'number' })
export class BusLinesStore extends EntityStore<BusLinesState, BusLine> {
  /**
   *
   */
  constructor() {
    super(initialState);
  }
}
