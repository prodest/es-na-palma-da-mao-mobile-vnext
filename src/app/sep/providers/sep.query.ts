import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import isEqual from 'lodash-es/isEqual';
import { distinctUntilChanged } from 'rxjs/operators';

import { FavoriteProtocol, Protocol } from '../model';
import { FavoriteProtocolState, FavoriteProtocolStore } from './sep.store';

@Injectable()
export class SepQuery extends QueryEntity<FavoriteProtocolState, FavoriteProtocol> {
  favorites$ = this.selectAll().pipe(distinctUntilChanged(isEqual));

  /**
   *
   */
  constructor(protected store: FavoriteProtocolStore) {
    super(store);
  }

  
  /**
   *
   */
  isFavorite(protocol: Protocol): boolean {
    return false; // this.storage.isFavorite(protocol);
  }
}
