import { Injectable } from '@angular/core';
import { QueryEntity, QueryConfig, Order } from '@datorama/akita';
import isEqual from 'lodash-es/isEqual';
import { distinctUntilChanged } from 'rxjs/operators';

import { FavoriteProtocol } from '../model';
import { FavoriteProtocolState, FavoriteProtocolStore } from './sep.store';

@Injectable()
@QueryConfig<FavoriteProtocol>({
  sortBy: 'number',
  sortByOrder: Order.ASC
})
export class SepQuery extends QueryEntity<FavoriteProtocolState, FavoriteProtocol> {
  favorites$ = this.selectAll().pipe(distinctUntilChanged(isEqual));

  /**
   *
   */
  constructor(protected store: FavoriteProtocolStore) {
    super(store);
  }

  isFavorite = (protocolNumber: string): boolean => {
    return this.hasEntity(protocolNumber);
  };
}
